import type { Router } from 'vue-router'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

const publicRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/Home.vue'),
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import('@/components/Drag.vue'),
  },
  {
    path: '/whiteboard',
    name: 'whiteboard',
    component: () => import('@/components/Whiteboard.vue'),
  },
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
