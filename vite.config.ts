/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import PostcssNested from 'postcss-nested'
import VueMacros from 'unplugin-vue-macros/vite'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './scripts/vitest.setup.ts'),
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx(),
      },
    }),
    Unocss(),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    postcss: {
      plugins: [PostcssNested],
    },
  },
})
