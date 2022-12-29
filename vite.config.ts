/// <reference types="vitest" />
import path from 'path'
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
  },
  plugins: [vueJsx(), vue(), Unocss()],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
