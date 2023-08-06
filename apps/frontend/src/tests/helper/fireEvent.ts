type Node = HTMLElement | Document

export const fireEvent = {
  keyDown(options: KeyboardEventInit) {
    const event = new KeyboardEvent('keydown', options)
    window.dispatchEvent(event)
  },

  mousedown(node: Node, options: MouseEventInit) {
    const event = new MouseEvent('mousedown', options)
    node.dispatchEvent(event)
  },

  mousemove(node: Node, options: MouseEventInit) {
    const event = new MouseEvent('mousemove', options)
    node.dispatchEvent(event)
  },

  mouseup(node: Node, options?: MouseEventInit) {
    const event = new MouseEvent('mouseup', options)
    node.dispatchEvent(event)
  },
}
