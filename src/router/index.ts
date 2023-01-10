import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { SettingsRoute } from './settings'
import Task from '@/pages/Task.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/task' },
  { path: '/task', component: Task, name: 'Task' },
  SettingsRoute,
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
