export const useCanvasTool = () => {
  const getImageUrl = (name) => {
    return new URL(`../assets/canvas-tool/${name}.svg`, import.meta.url).href
  }
  const canvasTools = [
    {
      name: 'arrow',
      imgSrc: getImageUrl('arrow'),
      cname: '箭头',
      childType: 'circular',
      child: {
        leftControl: [
          { circular: 6, lineSize: 1 },
          { circular: 10, lineSize: 7 },
          { circular: 14, lineSize: 14 },
        ],
        rightControl: [
          {
            color: '#E70B0B',
          },
          {
            color: '#FFDF2B',
          },
          {
            color: '#319F12',
          },
          {
            color: '#C630CE',
          },
          {
            color: '#F5F5F5',
          },
        ],
      },
    },
    {
      name: 'tag',
      imgSrc: getImageUrl('tag'),
      cname: '标注',
      childType: 'size',
      child: {
        leftControl: [
          { key: 'small', value: 16, name: '小' },
          { key: 'normal', value: 22, name: '中' },
          { key: 'large', value: 28, name: '大' },
        ],
        rightControl: [
          {
            color: '#E70B0B',
          },
          {
            color: '#FFDF2B',
          },
          {
            color: '#319F12',
          },
          {
            color: '#C630CE',
          },
          {
            color: '#F5F5F5',
          },
        ],
      },
    },
    {
      name: 'frame',
      imgSrc: getImageUrl('frame'),
      cname: '方框',
      childType: 'circular',
      child: {
        leftControl: [
          { circular: 6, lineSize: 5 },
          { circular: 10, lineSize: 9 },
          { circular: 14, lineSize: 13 },
        ],
        rightControl: [
          {
            color: '#E70B0B',
          },
          {
            color: '#FFDF2B',
          },
          {
            color: '#319F12',
          },
          {
            color: '#C630CE',
          },
          {
            color: '#F5F5F5',
          },
        ],
      },
    },
    {
      name: 'dot',
      imgSrc: getImageUrl('dot'),
      cname: '打点',
      childType: 'none',
      child: {
        leftControl: [],
        rightControl: [],
      },
    },
    {
      name: 'rubber',
      imgSrc: getImageUrl('rubber'),
      cname: '橡皮',
      childType: 'none',
      child: {
        leftControl: [],
        rightControl: [],
      },
    },
  ]

  return {
    canvasTools,
  }
}
