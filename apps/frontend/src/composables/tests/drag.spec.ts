import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDrag } from '../drag'
import { fireEvent } from '@/tests/helper'

describe('drag', () => {
  afterEach(() => {
    fireEvent.mouseup(document)
  })
  describe('basic', () => {
    it('should moveDistance < 0 when moving to the left', () => {
      const el = document.createElement('div')
      const moveSpy = vi.fn()

      useDrag({
        el,
        onMove: moveSpy,
      })

      fireEvent.mousedown(el, { clientX: 2 })
      fireEvent.mousemove(document, { clientX: 1 })

      expect(moveSpy).toBeCalledWith(-1)
    })

    it('move twice', () => {
      const el = document.createElement('div')
      const moveSpy = vi.fn()

      useDrag({
        el,
        onMove: moveSpy,
      })

      fireEvent.mousedown(el, { clientX: 3 })
      fireEvent.mousemove(document, { clientX: 2 })
      fireEvent.mousemove(document, { clientX: 1 })

      expect(moveSpy).toHaveBeenNthCalledWith(1, -1)
      expect(moveSpy).toHaveBeenNthCalledWith(2, -1)
    })

    it('should moveDistance > 0 when moving to the right', () => {
      const el = document.createElement('div')
      const moveSpy = vi.fn()

      useDrag({
        el,
        onMove: moveSpy,
      })

      fireEvent.mousedown(el, { clientX: 1 })
      fireEvent.mousemove(document, { clientX: 2 })

      expect(moveSpy).toBeCalledWith(1)
    })
  })

  describe('move range', () => {
    it('should not move when you are on the left edge', () => {
      const el = document.createElement('div')
      const moveSpy = vi.fn()

      useDrag({
        el,
        moveRange: [10, 50],
        onMove: moveSpy,
      })

      fireEvent.mousedown(el, { clientX: 10 })
      fireEvent.mousemove(document, { clientX: 9 })

      expect(moveSpy).not.toBeCalled()
    })

    it('should not move when you are on the right edge', () => {
      const el = document.createElement('div')
      const moveSpy = vi.fn()

      useDrag({
        el,
        moveRange: [10, 50],
        onMove: moveSpy,
      })

      fireEvent.mousedown(el, { clientX: 50 })
      fireEvent.mousemove(document, { clientX: 51 })

      expect(moveSpy).not.toBeCalled()
    })
  })
})
