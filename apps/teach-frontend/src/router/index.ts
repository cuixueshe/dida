import type { App } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteNames } from './const'
import { SettingsRoute } from './settings'
import { messageRedirectToSignIn } from '@/composables/message'
import { finishLoading, startLoading } from '@/composables/loadingBar'
import { checkHaveToken } from '@/utils/token'
import Task from '@/pages/Task.vue'
import Login from '@/pages/Login.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/task',
    name: RouteNames.HOME,
  },
  {
    path: '/task',
    component: Task,
    name: RouteNames.TASK,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: Login,
    name: RouteNames.LOGIN,
    meta: {
      layout: false,
    },
  },
  SettingsRoute,
]

export function setupRouterGuard(router: Router) {
  router.beforeEach(() => {
    startLoading()
  })
  router.afterEach(() => {
    finishLoading()
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requiresAuth)) {
      if (checkHaveToken())
        next()
      else
        messageRedirectToSignIn(() => next({ name: RouteNames.LOGIN }))
    }
    else {
      next()
    }
  })
}

let router: Router
export const setupRouter = async (app: App) => {
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}

export function getRouterInstance() {
  return router
}

export function setRouterInstance(routerInstance: Router) {
  router = routerInstance
}
