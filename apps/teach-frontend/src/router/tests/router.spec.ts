import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { RouterMock } from 'vue-router-mock'
import { createRouterMock } from 'vue-router-mock'
import { routes, setupRouterGuard } from '../index'
import { RouteNames } from '../const'
import { cleanToken, setToken } from '@/utils/token'

function setupRouter() {
  const router = createRouterMock({
    spy: {
      create: fn => vi.fn(fn),
      reset: spy => spy.mockClear(),
    },
    routes,
    useRealNavigation: true,
  })

  setupRouterGuard(router)

  return router
}
describe('router', () => {
  let router: RouterMock
  beforeEach(() => {
    cleanToken()
    router = setupRouter()
  })

  describe('requires auth', () => {
    it('should go to task page when have token', async () => {
      setToken('token')

      await router.push({ name: RouteNames.TASK })

      expect(router.currentRoute.value.name).toBe(RouteNames.TASK)
    })

    it('should go to login page when do not have token', async () => {
      vi.useFakeTimers()

      router.push({ name: RouteNames.TASK })
      await vi.runAllTimersAsync()

      expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN)
    })
  })

  it('should go to login page when do not requires auth', async () => {
    await router.push({ name: RouteNames.LOGIN })

    expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN)
  })
})
