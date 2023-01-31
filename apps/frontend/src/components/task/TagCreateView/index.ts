import type { Component } from 'vue'
import { createApp, h, reactive } from 'vue'
import TagCreateView from '../TagCreateView.vue'
import type { Tag } from '@/services/task/listTag'

const mountCompoent = (component: Component, props: Record<string | symbol, any>, eventListener: Record<string, any>) => {
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

interface TagDialogOptions {
  show?: boolean
  tag?: Omit<Tag, 'loadTasks'>
}

function TagDialog(options: TagDialogOptions = {}) {
  let pRes: (res: string) => void
  const p = new Promise((resolve) => {
    pRes = resolve
  })
  const reactiveOptions = reactive(Object.assign({ show: false }, options))
  const { unmount } = mountCompoent(TagCreateView, reactiveOptions, {
    'onCancel': () => {
      pRes('cancel')
    },
    'onClose': () => {
      pRes('close')
    },
    'onClosed': () => {
      unmount()
    },
    'onCreated': () => {
      pRes('created')
    },
    'onUpdate:show': (value: boolean) => {
      reactiveOptions.show = value
    },
  })
  reactiveOptions.show = true
  return p
}

export default TagDialog
