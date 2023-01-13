/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

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
    vue(),
    vueJsx(),
    Unocss(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', {
        'naive-ui': [
          'useDialog',
          'useMessage',
          'useNotification',
          'useLoadingBar',
        ],
      }],
      dts: 'typings/auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'typings/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      'services/': `${path.resolve(__dirname, 'src/services')}/`,
    },
  },
})
