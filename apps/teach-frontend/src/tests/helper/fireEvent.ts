export const fireEvent = {
  keydown(options: KeyboardEventInit) {
    const event = new KeyboardEvent('keydown', options)
    window.dispatchEvent(event)
  },
}
