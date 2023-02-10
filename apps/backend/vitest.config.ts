import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig({
  plugins: [
    swc.vite(),
  ],
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
})
