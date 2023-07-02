export const fireEvent = {
  keyDown(eventInitDict?: KeyboardEventInit | undefined) {
    window.dispatchEvent(new KeyboardEvent('keydown', eventInitDict))
  },
}
