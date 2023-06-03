import { expect, test } from 'vitest'
import { nextTick } from 'vue'
import { useCounter } from './counter'

test('increments count and updates doubledCount', async () => {
  const { count, doubledCount, increment } = useCounter()

  expect(count.value).toBe(0)
  expect(doubledCount.value).toBe(0)

  increment()

  await nextTick()

  expect(count.value).toBe(1)
  expect(doubledCount.value).toBe(2)
})
