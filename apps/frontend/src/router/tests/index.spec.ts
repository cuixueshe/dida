import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRouterMock } from 'vue-router-mock'
import { routes, setupRouterGuard } from '../index'
import { RouteNames } from '../const'
import { cleanToken, setToken } from '@/utils/token'

describe('router ', () => {
  beforeEach(() => {
    cleanToken()
  })

  describe('requires auth', async () => {
    it('go to task page when have token', async () => {
      setToken('token')

      const router = createRouterMock({
        spy: {
          create: fn => vi.fn(fn),
          reset: spy => spy.mockClear(),
        },
        useRealNavigation: true,
        routes,
      })

      setupRouterGuard(router)

      await router.push({ name: RouteNames.TASK })

      expect(router.currentRoute.value.name).toBe(RouteNames.TASK)
    })

    it('go to login page when have not token', async () => {
      vi.useFakeTimers()

      const router = createRouterMock({
        spy: {
          create: fn => vi.fn(fn),
          reset: spy => spy.mockClear(),
        },
        useRealNavigation: true,
        routes,
      })

      setupRouterGuard(router)

      router.push({ name: RouteNames.TASK })
      await vi.runAllTimersAsync()

      expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN)
    })
  })

  it('go to login page when do not requires auth', async () => {
    const router = createRouterMock({
      spy: {
        create: fn => vi.fn(fn),
        reset: spy => spy.mockClear(),
      },
      useRealNavigation: true,
      routes,
    })

    setupRouterGuard(router)

    await router.push({ name: RouteNames.LOGIN })

    expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN)
  })
})
