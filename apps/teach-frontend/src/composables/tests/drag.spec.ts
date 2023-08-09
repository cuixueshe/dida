import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDrag } from '../drag'
import { fireEvent } from '@/tests/helper'

describe('useDrag', () => {
  afterEach(() => {
    fireEvent.mouseup(document)
  })
  it('move left', () => {
    const el = document.createElement('div')
    const onMove = vi.fn()

    useDrag({
      el,
      onMove,
    })

    fireEvent.mousedown(el, { clientX: 10 })
    fireEvent.mousemove(document, { clientX: 9 })

    expect(onMove).toBeCalledWith(-1)
  })

  it('move right', () => {
    const el = document.createElement('div')
    const onMove = vi.fn()

    useDrag({
      el,
      onMove,
    })

    fireEvent.mousedown(el, { clientX: 10 })
    fireEvent.mousemove(document, { clientX: 11 })

    expect(onMove).toBeCalledWith(1)
  })

  it('continuous moving', () => {
    const el = document.createElement('div')
    const onMove = vi.fn()

    useDrag({
      el,
      onMove,
    })

    fireEvent.mousedown(el, { clientX: 10 })
    fireEvent.mousemove(document, { clientX: 11 })
    fireEvent.mousemove(document, { clientX: 12 })

    expect(onMove).toHaveBeenNthCalledWith(1, 1)
    expect(onMove).toHaveBeenNthCalledWith(2, 1)
  })

  describe('move range', () => {
    it('should not move when past the left bounding', () => {
      const el = document.createElement('div')
      const onMove = vi.fn()
      const leftBounding = 10

      useDrag({
        el,
        onMove,
        moveRange: [leftBounding, 50],
      })

      fireEvent.mousedown(el, { clientX: leftBounding })
      fireEvent.mousemove(document, { clientX: leftBounding - 1 })

      expect(onMove).not.toBeCalled()
    })

    it('should not move when past the right bounding', () => {
      const el = document.createElement('div')
      const onMove = vi.fn()
      const rightBounding = 50

      useDrag({
        el,
        onMove,
        moveRange: [10, rightBounding],
      })

      fireEvent.mousedown(el, { clientX: rightBounding })
      fireEvent.mousemove(document, { clientX: rightBounding + 1 })

      expect(onMove).not.toBeCalled()
    })
  })
})
