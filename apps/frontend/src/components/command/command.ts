import { onMounted, onUnmounted, ref } from 'vue'
import { useIsMac } from '@/composables'

const isMac = useIsMac()

const show = ref(false)

function showCommand() {
  show.value = true
}

function hideCommand() {
  show.value = false
}

function registerKeyboardShortcut() {
  // Command + K Or Command + / will show command in MacOS
  // Ctrl + K Or Ctrl + / in Windows
  const keydownHandler = (e: KeyboardEvent) => {
    if (
      (e.key === 'k' || e.key === 'л')
      && (isMac.value ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault()
      showCommand()
    }

    if (
      (e.key === '/' || e.key === ',')
      && (isMac.value ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault()
      showCommand()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', keydownHandler)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', keydownHandler)
  })
}

export function useCommand() {
  return {
    show,
    showCommand,
    hideCommand,
    registerKeyboardShortcut,
  }
}
