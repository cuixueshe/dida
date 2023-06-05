import { onMounted, onUnmounted, ref } from 'vue'
import { useIsMac } from '@/composables'

export const showCommandModal = ref(false)

export function openCommandModal() {
  showCommandModal.value = true
}

export function closeCommandModal() {
  showCommandModal.value = false
}

export function registerKeyboardShortcut() {
  // Command + K will show command in MacOS
  // Ctrl + K in Windows
  const isMac = useIsMac()
  const keydownHandler = (e: KeyboardEvent) => {
    if (
      (e.key === 'k')
      && (isMac.value ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault()
      openCommandModal()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', keydownHandler)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', keydownHandler)
  })
}
