import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { closeCommandModal, openCommandModal, registerKeyboardShortcut, showCommandModal } from '../commandModal'
import { useIsMac } from '@/composables'
import { useSetup } from '@/tests/test-helper'

vi.mock('@/composables/misc')

describe('CommandModal', () => {
  beforeEach(() => {
    showCommandModal.value = false
  })

  it('should be open command modal', () => {
    openCommandModal()

    expect(showCommandModal.value).toBe(true)
  })
  it('should be close command modal', () => {
    openCommandModal()

    closeCommandModal()

    expect(showCommandModal.value).toBe(false)
  })

  describe('KeyboardShortcut', () => {
    it('should be open command modal when use command + k on Mac', () => {
      vi.mocked(useIsMac).mockImplementation(() => computed(() => true))
      useSetup(() => {
        registerKeyboardShortcut()
      })
      // 触发键盘事件
      // TODO 按照 @testing-library/vue 的 api 来封装一下触发键盘事件的逻辑到 test-helper
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
      })
      window.dispatchEvent(event)

      expect(showCommandModal.value).toBe(true)
    })
    it('should be open command modal when use ctrl + k on Win', () => {
      vi.mocked(useIsMac).mockImplementation(() => computed(() => false))
      useSetup(() => {
        registerKeyboardShortcut()
      })
      // 触发键盘事件
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      })
      window.dispatchEvent(event)

      expect(showCommandModal.value).toBe(true)
    })
  })
})
