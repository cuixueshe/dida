import { vi } from 'vitest'
import type { RouterMockOptions } from 'vue-router-mock'
import { createRouterMock } from 'vue-router-mock'
import { setRouterInstance, setupRouterGuard } from '@/router'

export function setupRouter(options?: RouterMockOptions) {
  const router = createRouterMock({
    spy: {
      create: fn => vi.fn(fn),
      reset: spy => spy.mockClear(),
    },
    ...options,
  })

  setupRouterGuard(router)

  setRouterInstance(router)

  return router
}
