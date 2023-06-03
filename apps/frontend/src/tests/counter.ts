import { ref, watch } from 'vue'

export function useCounter() {
  const count = ref(0)
  const doubledCount = ref(0)

  watch(count, (newValue) => {
    doubledCount.value = newValue * 2
  })

  function increment() {
    count.value++
  }

  return { count, doubledCount, increment }
}
