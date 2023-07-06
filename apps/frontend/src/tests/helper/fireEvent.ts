export const fireEvent = {
  keyDown(options: KeyboardEventInit) {
    const event = new KeyboardEvent('keydown', options)
    window.dispatchEvent(event)
  },
}
