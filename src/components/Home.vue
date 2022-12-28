<script setup lang="ts">
import router from '@/router'

const experiments = ref([
  {
    name: '拖拽',
    path: '/drag',
  },
  {
    name: '白板',
    path: '/whiteboard',
  },
])
const go = (path: string) => {
  router.push(path)
}
</script>

<template>
  <h1>Vue 实验室</h1>
  <div>
    <button v-for="item of experiments" :key="item.path" @click="go(item.path)">
      {{ item.name }}
    </button>
  </div>
</template>
