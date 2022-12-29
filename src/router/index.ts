import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Task from '../pages/Task.vue'

export const routes: RouteRecordRaw[] = [
  // { path: "/", component: Home, name: "Home" },
  { path: '/', redirect: '/task' },
  { path: '/about', component: About, name: 'About' },
  { path: '/task', component: Task, name: 'Task' },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
