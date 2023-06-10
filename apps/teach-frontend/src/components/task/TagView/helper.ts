import type { Component } from 'vue'
import { createApp, h, reactive } from 'vue'

export const mountComponent = (component: Component, props: Record<string | symbol, any>, eventListener: Record<string, any>) => {
  const app = createApp({
    setup() {
      return () => h(component, {
        ...props,
        ...eventListener,
      })
    },
  })
  const host = document.createElement('div')
  document.body.appendChild(host)
  app.mount(host)

  return {
    unmount() {
      app.unmount()
      document.body.removeChild(host)
      // eslint-disable-next-line no-console
      console.log('unounted')
    },
  }
}

export const dialogInit = (component: Component, options: Record<any, any> = {}) => {
  let pRes: (res: string) => void
  const p = new Promise((resolve) => {
    pRes = resolve
  })
  const reactiveOptions = reactive(Object.assign({ show: false }, options))
  const { unmount } = mountComponent(component, reactiveOptions, {
    'onCancel': () => {
      pRes('cancel')
    },
    'onClose': () => {
      pRes('close')
    },
    'onClosed': () => {
      unmount()
    },
    'onConfirm': () => {
      pRes('confirm')
    },
    'onUpdate:show': (value: boolean) => {
      reactiveOptions.show = value
    },
  })
  reactiveOptions.show = true
  return p
}
