export const fireEvent = {
  keyDown(eventInitDict: KeyboardEventInit) {
    window.dispatchEvent(new KeyboardEvent('keydown', eventInitDict))
  },
}
