import 'fake-indexeddb/auto'
import { config } from '@vue/test-utils'
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock'
import { beforeEach, vi } from 'vitest'

function setupRouterMock() {
  const router = createRouterMock({
    spy: {
      create: fn => vi.fn(fn),
      reset: spy => spy.mockClear(),
    },
  })

  beforeEach(() => {
    router.reset()
    injectRouterMock(router)
  })

  config.plugins.VueWrapper.install(VueRouterMock)
}

setupRouterMock()

const originalConsoleWarn = console.warn
console.warn = (log: string) => {
  if (!log.includes('[Vue Router warn]'))
    originalConsoleWarn(log)
}
