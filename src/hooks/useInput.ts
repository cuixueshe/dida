import { useEventListener } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref } from 'vue'

export default function useInput() {
  const inputRef: Ref<HTMLInputElement | null> = ref(null)
  useEventListener(
    () => inputRef.value,
    'blur',
    () => {
      const classList = inputRef.value!.classList

      classList.add('bg-gray-100')
      classList.add('dark:bg-#3B3B3B')

      classList.remove('border-blue')
      classList.remove('dark:color-black')
    },
  )

  useEventListener(
    () => inputRef.value,
    'focus',
    () => {
      const classList = inputRef.value!.classList

      classList.add('border-blue')
      classList.add('dark:color-black')
      classList.remove('bg-gray-100')
      classList.remove('dark:bg-#3B3B3B')
    },
  )

  function onFocus() {
    inputRef.value!.focus()
  }

  return {
    inputRef,
    onFocus,
  }
}
