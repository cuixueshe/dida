import { defineConfig } from 'vitest/config'
import { mergeConfig } from 'vite'
import defaultConfig from '../vitest.config'

export default mergeConfig(defaultConfig, defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
  },
}))
