import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initDB } from './db'
import App from './App.vue'
import { setupRouter } from './router'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style/overrides.css'
import { initStore } from './store'

async function setupApp() {
  await initDB()
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  await initStore()
  await setupRouter(app)
  app.use(ContextMenu)
  // This must be placed at bottom of app initialization, before mount.
  resolveNaiveAndTailwindConflict()
  app.mount('#app')
}

// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
function resolveNaiveAndTailwindConflict() {
  // We use tailwind reset as Unocss reset
  // But some of reset style will replaced some of naive-ui style
  // To following the docs, we need to do this.
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}

setupApp()
