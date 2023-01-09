import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Task from '@/pages/Task.vue'
import Settings from '@/pages/Settings.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/task' },
  { path: '/task', component: Task, name: 'Task' },
  {
    path: '/settings',
    component: Settings,
    name: 'Settings',
    meta: { title: '设置' },
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
