/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './scripts/vitest.setup.ts'),
  },
  plugins: [vueJsx(), vue(), Unocss()],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      'services/': `${path.resolve(__dirname, 'src/services')}/`,
    },
  },
})
