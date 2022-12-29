import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Task from '../pages/Task.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/task' },
  { path: '/task', component: Task, name: 'Task' },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
