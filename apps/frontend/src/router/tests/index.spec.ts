import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { RouterMock } from 'vue-router-mock'
import { setupRouterGuard } from '../index'
import { RouteNames } from '../const'
import { messageRedirectToSignIn } from '@/composables/message'
import { cleanToken, setToken } from '@/utils/token'
import { setupRouterMock } from '@/tests/helper'

vi.mock('@/composables/message')
vi.mocked(messageRedirectToSignIn).mockImplementation(fn => fn())

describe('router', () => {
  let router: RouterMock
  beforeEach(() => {
    cleanToken()

    router = setupRouterMock({
      useRealNavigation: true,
    })

    setupRouterGuard(router)
  })
  it('should go to next route when the route has requiresAuth and token', async () => {
    router.addRoute({
      name: RouteNames.TASK,
      meta: { requiresAuth: true },
      path: '/task',
      redirect: '',
      component: null as any,
    })

    setToken('token')

    await router.push({ name: RouteNames.TASK })

    expect(router.currentRoute.value.name).toBe(RouteNames.TASK)
  })

  it('should go to signin when the route has requiresAuth and does not have token', async () => {
    router.addRoute({
      name: RouteNames.TASK,
      meta: { requiresAuth: true },
      path: '/task',
      redirect: '',
      component: null as any,
    })

    router.addRoute({
      path: '/login',
      component: null as any,
      name: RouteNames.LOGIN,
    })

    await router.push({ name: RouteNames.TASK })

    expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN)
  })

  it('should go to next route when the route does not need to check auth ', async () => {
    router.addRoute({
      name: RouteNames.TASK,
      path: '/task',
      redirect: '',
      component: null as any,
    })

    await router.push({ name: RouteNames.TASK })

    expect(router.currentRoute.value.name).toBe(RouteNames.TASK)
  })
})
