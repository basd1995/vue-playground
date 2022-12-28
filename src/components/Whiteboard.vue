<script setup lang='ts'>
import { fabric } from 'fabric'
import { useClipboardData } from '@/hooks/clipboard'
import { useCanvasTool } from '@/hooks/canvas-tool'

const { canvasTools } = useCanvasTool()
const { getClipboardData } = useClipboardData()
const src = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2Fwearetheledger%2Fhyperledger-fabric-typescript-boilerplate-455004d0c6c8&psig=AOvVaw0z43s7OHALWfRU8Z4uBoVz&ust=1670577356823000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLiOlOHX6fsCFQAAAAAdAAAAABAE'

const imgBase64 = ref<any>('')
const text = ref('')

const test = (x: any, y: any) => {
  // 创建矩形对象
  const rect = new fabric.Rect({
    // 设置矩形的宽高和颜色
    top: 10,
    left: 10,
    width: 100,
    height: 100,
    fill: '',
    stroke: 'red',
    strokeWidth: 5,
    strokeUniform: true,
    // 设置不显示控制点
    hasControls: false,
  })

  const rect2 = new fabric.Rect({
    // 设置矩形的宽高和颜色
    top: 20,
    left: 20,
    width: 100,
    height: 100,
    fill: '',
    stroke: 'red',
    strokeWidth: 5,
    strokeUniform: true,
  })

  // 将矩形对象添加到画布上
  canvas.add(rect)
  canvas.add(rect2)

  // 渲染画布
  canvas.renderAll()
}

const onKeyPaste = async () => {
  const result = await getClipboardData()
  if (result!.type === 'image')
    imgBase64.value = await blobToBase64(result!.blob)
  else
    alert('请复制图片')
}

const blobToBase64 = (blob: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => {
      resolve(e.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

let canvas: any
// canvas背景图片
// const canvasBgImgSrc = ref('https://cdn.pixabay.com/photo/2022/12/02/03/42/sky-7630197_1280.png')
const canvasBgImgSrc = ref('https://bizfocus-dev.oss-cn-beijing.aliyuncs.com/123.png')
// canvas打点图片
const dotIcon = ref()
const canvasWidth = ref(700)
const canvasHeight = ref(600)
const canvasPic = ref('')
const canvasSelection = ref(false)

// 鼠标左键按下
const leftMouseDown = ref(false)
// 起始点
const startPointer = reactive({ x: 0, y: 0 })
// 移动绘制的对象，如矩形、圆形、箭头等
const moveDrawingObject = ref<any>(null)

// 标记点
const createDot = (x: number, y: number) => {
  if (canvasSelection.value)
    return
  // 文字
  const text = new fabric.Textbox(' ', {
    left: x + 10,
    top: y,
    width: 10,
    fontSize: 24,
    fill: '#fff',
    text: String('1'),
    lockUniScaling: true,
  })

  // 图片
  const icon = new fabric.Image(dotIcon.value, {
    left: x,
    top: y,
    scaleX: 0.01,
    scaleY: 0.01,
  })

  // 组合
  const group = new fabric.Group([icon, text], {
    hasBorders: true,
    // 设置不显示控制点
    hasControls: false,
    // 设置不显示旋转点
    hasRotatingPoint: false,
  })
  // 添加canvas
  canvas.add(group)
  // 刷新
  canvas.renderAll()
}

// 矩形
const createRect = (x: number, y: number) => {
  moveDrawingObject.value = new fabric.Rect({
    // 设置矩形的宽高和颜色
    left: Math.min(startPointer.x, x),
    top: Math.min(startPointer.y, y),
    width: Math.abs(startPointer.x - x),
    height: Math.abs(startPointer.y - y),
    fill: '',
    stroke: 'red',
    strokeWidth: 5,
    strokeUniform: true,
  })
  canvas.add(moveDrawingObject.value)
  canvas.renderAll()
}

// 箭头路径变量
const arrowPath = (x: number, y: number) => {
  const x1 = startPointer.x
  const x2 = x - 10
  const y1 = startPointer.y
  const y2 = y - 10
  const w = x2 - x1
  const h = y2 - y1
  const sh = Math.cos(Math.PI / 4) * 16
  const sin = h / Math.sqrt(w ** 2 + h ** 2)
  const cos = w / Math.sqrt(w ** 2 + h ** 2)
  const w1 = (16 * sin) / 4
  const h1 = (16 * cos) / 4
  const centerX = sh * cos
  const centerY = sh * sin
  /**
   * centerX,centerY 表示起始点，终点连线与箭头尖端等边三角形交点相对x，y
   * w1 ，h1用于确定四个点
   */

  let path = ` M ${x1} ${y1}`
  // path += ` L ${x2} ${y2}`
  path += ` L ${x2 - centerX + w1} ${y2 - centerY - h1}`
  path += ` L ${x2 - centerX + w1 * 2} ${y2 - centerY - h1 * 2}`
  path += ` L ${x2} ${y2}`
  path += ` L ${x2 - centerX - w1 * 2} ${y2 - centerY + h1 * 2}`
  path += ` L ${x2 - centerX - w1} ${y2 - centerY + h1}`
  path += ' Z'

  return path
}
// 箭头
const createArrow = (x: number, y: number) => {
  moveDrawingObject.value = new fabric.Path(arrowPath(x, y), {
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
  })
  canvas.add(moveDrawingObject.value)
  canvas.renderAll()
}

// 移动绘制
const moveDrawing = (x: number, y: number) => {
  if (canvasSelection.value)
    return
  if (moveDrawingObject.value)
    canvas.remove(moveDrawingObject.value)
  switch (tool.value) {
    case 'frame':
      createRect(x, y)
      break

    case 'arrow':
      createArrow(x, y)
      break

    case 'rubber':

      break

    default:
      break
  }
  canvas.renderAll()
}

const moveCount = ref(1)
const BindCanvasEvent = () => {
  // 事件绑定
  canvas.on({
    'mouse:down': (o: any) => {
      // 鼠标按下坐标
      const pointer = {
        x: o.pointer.x,
        y: o.pointer.y,
      }
      // 记录起始点
      startPointer.x = pointer.x
      startPointer.y = pointer.y

      if (o.button === 1) {
        leftMouseDown.value = true
        // 关闭右键菜单
        modal.value = false
        // 当前模式是否为编辑
        if (!mode.value)
          return
        // 当前选择任何对象，没有就是新建
        if (!o.target) {
          switch (tool.value) {
            case 'dot':
              createDot(pointer.x, pointer.y)
              break
          }
        }
      }
      if (o.button === 3)
        // 开启右键菜单
        modal.value = true
    },
    'mouse:up': (o: any) => {
      // 左键状态变化
      leftMouseDown.value = false
      // 如果移动绘制的对象宽度或高度为0，就删除
      moveDrawingObject.value = null
    },
    'mouse:move': (o: any) => {
      if (moveCount.value % 2 && !leftMouseDown.value) {
        // 减少绘制频率
        return
      }
      moveCount.value++
      const pointer = {
        x: o.pointer.x,
        y: o.pointer.y,
      }
      if (!mode.value)
        return
      if (!o.target && unref(leftMouseDown)) {
        switch (tool.value) {
          case 'frame':
            moveDrawing(pointer.x, pointer.y)
            break
          case 'arrow':
            moveDrawing(pointer.x, pointer.y)
            break
        }
      }
    },
    'mouse:dblclick': (o: any) => {},
    // 悬停
    'mouse:over': (o: any) => {},
    // 对象移动时间
    'object:moving': (e: any) => {
      console.log('object:moving')
    },
    // 增加对象
    'object:added': () => {
      console.log('object:added')
    },
    'object:modified': (e: any) => {
      console.log('object:modified')
    },
    'selection:created': (e: any) => {
      console.log('selection:created')
    },
    // 对象被选择
    'object:selected': (e: any) => {
      console.log('object:selected')
    },
  })
}

/**
 * @description: 画布背景
 * @param {*} url 图片地址
 * @return {*}
 */
const setCanvasBackground = (url: string) => {
  fabric.Image.fromURL(
    url,
    (img: any) => {
      // 计算图片缩放比例
      const scaleX = canvas.width / img.width
      const scaleY = canvas.height / img.height
      const scale = Math.min(scaleX, scaleY)

      img.originX = 'left'
      img.originY = 'top'

      // 计算图片位置，使图片居中
      img.top = (canvas.height - img.height * scale) / 2
      img.left = (canvas.width - img.width * scale) / 2

      // 设置图片缩放比例
      img.scaleX = scale
      img.scaleY = scale
      img.itemType = 'baseImg'
      img.evented = false // 让对象无法被选中
      img.selectable = false
      img.lockRotation = true
      img.selectable = false
      // 将图片添加到 canvas 中
      canvas.add(img)
      // 置于最底层
      img.sendToBack()
      // 渲染 canvas
      canvas.renderAll()
    },
    { crossOrigin: 'Anonymous' },
  )
}

const initCanvas = () => {
  canvas = new fabric.Canvas(
    'whiteboard-canvas',
    {
      width: canvasWidth.value,
      height: canvasHeight.value,
      isDrawingMode: false,
      selectable: false,
      selection: false, // 不可框选
      devicePixelRatio: true, // Retina 高清屏 屏幕支持
      perPixelTargetFind: true, // 选中的时候以图形的实际大小来选择而不是以边框来选择
      backgroundColor: '#fff', // 背景色
      stopContextMenu: true, // 阻止默认右键菜单
      fireRightClick: true, // 右键事件
    },
  )
  // 启用频繁读取优化
  canvas.willReadFrequently = true
  test(0, 0)
  canvas.renderAll()
  // 设置背景图
  setCanvasBackground(canvasBgImgSrc.value)
  // 绑定事件
  BindCanvasEvent()
}

onMounted(() => {
  nextTick(() => {
    initCanvas()
  })
})

// 0 非编辑模式，1编辑模式
const mode = ref(true)
const tool = ref('arrow')
const handleTools = (item: any) => {
  tool.value = item.name
}
const getCanvasPic = () => {
  canvasPic.value = canvas.toDataURL({
    detailedInfoart: 'png',
    multiplier: 1,
  })
}

// 右键菜单
const modal = ref(false)
const modalRef = ref(null)
onClickOutside(modalRef, () => {
  modal.value = false
})

// 多选
const multiSelection = () => {
  // 外部变量，用于判断鼠标按下时是否应该进行绘制
  canvasSelection.value = true
  // fabric内部变量，是否可以选择
  canvas.selection = true
  // 遍历所有对象，除了底图设置可选
  canvas.forEachObject((obj: any) => {
    obj.selectable = !obj.itemType.inCludes('Img')
  })
  canvas.renderAll()
}
</script>

<template>
  <div id="whiteboard" @paste="onKeyPaste">
    <h2>
      当前模式：{{ mode ? '编辑' : '非编辑' }} <button @click="mode = !mode">
        切换模式
      </button>
    </h2>
    <h2>当前工具类型：{{ tool }}</h2>
    <button @click="getCanvasPic">
      生成图片
    </button>
    <br>
    <button @click="multiSelection">
      框选
    </button>
    <img :src="canvasPic" alt="">
    <div ref="target" class="board">
      <canvas id="whiteboard-canvas" />
    </div>
    <img
      v-show="false" ref="dotIcon" src="../assets/dot_PNG14.png" crossOrigin="anonymous" alt="打点图片"
      class="dot-icon-style"
    >
    <div class="button-all-control">
      <div ref="dragBox" class="button-control">
        <!-- 图标 -->
        <img
          v-for="item in canvasTools"
          :key="item.name"
          :class="`canvas-icon-style${tool === item.name ? ' active' : ''}`"
          :src="item.imgSrc"
          :alt="item.name" :title="item.cname"
          @click.stop="handleTools(item)"
        >
      </div>
    </div>
  </div>
  <div
    v-if="modal" ref="modalRef" class="context-menu"
    :style="{
      width: '100px',
      position: 'absolute',
      top: `${startPointer.y}px`,
      left: `${startPointer.x}px`,
      background: '#f5f5f5',
    }"
  >
    <p>1</p>
    <p>2</p>
    <p>3</p>
  </div>
</template>

<style scoped>
#whiteboard {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}

img {
  width: 200px;
}

.dot-icon-style {
  width: 20px;
  height: 20px;
}

.button-control {
  z-index: 5;
  width: 352px;
  height: 42px;
  line-height: 42px;
  background: #000000;
  opacity: 0.7;
  box-shadow: 0px 4px 7px 2px #f8f9fb;
  border-radius: 4px;
  padding: 0 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  bottom: 70px;
  right: calc(50% - 10% - 220px);
}
.canvas-icon-style {
  width: 22px;
  height: 22px;
  margin: 0 4px;
  padding: 2px;
  border: 1px dashed #000000;
  cursor: pointer;
}
.canvas-icon-style.active {
  border: 1px dashed #ffffff;
}
</style>
