import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { useCommandModal } from '../commandModal'
import * as misc from '@/composables/misc'
import { fireEvent, useSetup } from '@/tests/helper'

describe('CommandModal', () => {
  beforeEach(() => {
    const { closeCommandModal } = useCommandModal()
    closeCommandModal()
  })

  it('should be open command modal', () => {
    const { openCommandModal, showCommandModal } = useCommandModal()
    openCommandModal()

    expect(showCommandModal.value).toBe(true)
  })
  it('should be close command modal', () => {
    const { openCommandModal, closeCommandModal, showCommandModal } = useCommandModal()
    openCommandModal()

    closeCommandModal()

    expect(showCommandModal.value).toBe(false)
  })

  describe('KeyboardShortcut', () => {
    it('should be open command modal when use command + k on Mac', () => {
      vi.spyOn(misc, 'useIsMac').mockImplementation(() => computed(() => true))
      const { registerKeyboardShortcut, showCommandModal } = useCommandModal()

      useSetup(() => {
        registerKeyboardShortcut()
      })

      fireEvent.keydown({
        key: 'k',
        metaKey: true,
      })

      expect(showCommandModal.value).toBe(true)
    })
    it('should be open command modal when use ctrl + k on Win', () => {
      vi.spyOn(misc, 'useIsMac').mockImplementation(() => computed(() => false))
      const { registerKeyboardShortcut, showCommandModal } = useCommandModal()

      useSetup(() => {
        registerKeyboardShortcut()
      })

      fireEvent.keydown({
        key: 'k',
        ctrlKey: true,
      })

      expect(showCommandModal.value).toBe(true)
    })
  })
})
