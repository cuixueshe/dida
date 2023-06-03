import { Crypto } from '@peculiar/webcrypto'
import { config } from '@vue/test-utils'
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock'
import { beforeEach, vi } from 'vitest'

const crypto = new Crypto()
global.crypto = crypto

// init vue-router
const router = createRouterMock({
  spy: {
    create: fn => vi.fn(fn),
    reset: spy => spy.mockReset(),
  },
})
beforeEach(() => {
  injectRouterMock(router)
})
config.plugins.VueWrapper.install(VueRouterMock)
