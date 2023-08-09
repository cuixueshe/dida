export const fireEvent = {
  keyDown(eventInitDict?: KeyboardEventInit | undefined) {
    window.dispatchEvent(new KeyboardEvent('keydown', eventInitDict))
  },

  mousedown(
    node: HTMLElement | Document,
    eventInitDict?: MouseEventInit | undefined,
  ) {
    node.dispatchEvent(new MouseEvent('mousedown', eventInitDict))
  },

  mousemove(
    node: HTMLElement | Document,
    eventInitDict?: MouseEventInit | undefined,
  ) {
    node.dispatchEvent(new MouseEvent('mousemove', eventInitDict))
  },

  mouseup(
    node: HTMLElement | Document,
    eventInitDict?: MouseEventInit | undefined,
  ) {
    node.dispatchEvent(new MouseEvent('mouseup', eventInitDict))
  },
}
