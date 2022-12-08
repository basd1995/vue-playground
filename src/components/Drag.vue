<script setup lang='ts'>
import Draggable from 'vuedraggable'
const list1 = ref([
  { name: '任务1', id: 1 },
  { name: '任务2', id: 2 },
  { name: '任务3', id: 3 },
  { name: '任务4', id: 4 },
  { name: '任务5', id: 5 },
])
const list2 = ref([
  { name: '任务6', id: 6 },
  { name: '任务7', id: 7 },
  { name: '任务8', id: 8 },
  { name: '任务9', id: 9 },
  { name: '任务10', id: 10 },
])
const list3 = ref([
  { name: '任务11', id: 11 },
  { name: '任务12', id: 12 },
  { name: '任务13', id: 13 },
  { name: '任务14', id: 14 },
  { name: '任务15', id: 15 },
])
const list4 = ref([
  { name: '任务16', id: 16 },
  { name: '任务17', id: 17 },
  { name: '任务18', id: 18 },
  { name: '任务19', id: 19 },
  { name: '任务20', id: 20 },
])
const hidden = ref(true)
const checkMove = () => {
  hidden.value = false
}
</script>

<template>
  <h1>拖拽</h1>
  <div>
    <h2>看板</h2>
    <div class="kanban">
      <div class="option">
        <h3>配置</h3>
        <button />
      </div>
      <div class="task-panel">
        <h3>状态1</h3>
        <div class="task-list">
          <Draggable
            :list="list1" group="tasks"
            :animation="150" ghost-class="ghost"
            @start="hidden = false"
            @end="hidden = true"
          >
            <template #item="{ element }">
              <div class="task-item">
                <h4>{{ element.name }}</h4>
                <p>任务描述</p>
                <p>任务时间</p>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div v-if="hidden" class="task-panel">
        <h3>状态2</h3>
        <div class="task-list">
          <Draggable
            :list="list2" group="tasks"
            :animation="150" ghost-class="ghost"
          >
            <template #item="{ element }">
              <div class="task-item">
                <h4>{{ element.name }}</h4>
                <p>任务描述</p>
                <p>任务时间</p>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="task-panel">
        <h3>状态3</h3>
        <div class="task-list">
          <Draggable
            :list="list3" group="tasks"
            :animation="150" ghost-class="ghost"
          >
            <template #item="{ element }">
              <div class="task-item">
                <h4>{{ element.name }}</h4>
                <p>任务描述</p>
                <p>任务时间</p>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="task-panel">
        <h3>状态4</h3>
        <div class="task-list">
          <Draggable
            :list="list4" group="tasks"
            :animation="150" ghost-class="ghost"
          >
            <template #item="{ element }">
              <div class="task-item">
                <h4>{{ element.name }}</h4>
                <p>任务描述</p>
                <p>任务时间</p>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h2>列表</h2>
  </div>
</template>

<style scoped>
.kanban {
  display: flex;
  background-color: #bdf7ff;
}
.option {
  text-align: center;
  width: 200px;
  background-color: #ffffff;
  border: 1px solid;
}
.task-panel {
  background-color: #868686;
}
.task-list {
  padding: 5px 0;
  margin-bottom: 5px;
  height: 500px;
  background-color: #868686;
  overflow-y: auto;
}
.task-item {
  width: 200px;
  padding: 5px;
  margin: 5px;
  background-color: #fff;
  border-radius: 4px;
  cursor: move;
}
</style>
