import type { RouterMockOptions } from 'vue-router-mock'
import { createRouterMock } from 'vue-router-mock'
import { beforeEach, vi } from 'vitest'
import { setRouterInstance } from '@/router'

/**
 * 当需要处理依赖于 @router/index.ts 的 router 对象时 需要调用
 * 这个函数的目的是把 routerMock 赋值到 router 对象上
 * 很多情况下是需要直接调用 router 对象的()
 * 这个逻辑本应该是在 vitest.setup.ts 中进行赋值
 * 但是在 vitest.setup.ts 中调用会导致 vi.mock 出 bug
 * 所以有了这样一个方法
 */
export function setupRouterMock(options?: RouterMockOptions) {
  const router = createRouterMock({
    spy: {
      create: fn => vi.fn(fn),
      reset: spy => spy.mockClear(),
    },
    ...options,
  })

  setRouterInstance(router)

  beforeEach(() => {
    router.reset()
  })

  return router
}
