import { mount } from '@vue/test-utils'

export function useSetup<V>(setup: () => V) {
  const comp = {
    setup,
    render() {},
  }

  const wrapper = mount(comp)
  return {
    wrapper,
    router: wrapper.router,
  }
}

export const fireEvent = {
  keydown(options: KeyboardEventInit) {
    const event = new KeyboardEvent('keydown', options)
    window.dispatchEvent(event)
  },
}
