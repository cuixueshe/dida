import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { useCommandModal } from '../commandModal'
import { fireEvent, useSetup } from '@/tests/helper'
import * as misc from '@/composables/misc'

describe('command modal', () => {
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
    const { closeCommandModal, showCommandModal } = useCommandModal()

    closeCommandModal()

    expect(showCommandModal.value).toBe(false)
  })

  it('should be open command modal when press cmd+k on Mac', () => {
    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => true))
    const { registerKeyboardShortcut, showCommandModal } = useCommandModal()

    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keyDown({
      key: 'k',
      metaKey: true,
    })

    expect(showCommandModal.value).toBe(true)

    wrapper.unmount()
  })

  it('should be open command modal when press ctrl+k on Win', () => {
    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => false))
    const { registerKeyboardShortcut, showCommandModal } = useCommandModal()

    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keyDown({
      key: 'k',
      ctrlKey: true,
    })

    expect(showCommandModal.value).toBe(true)

    wrapper.unmount()
  })
})
