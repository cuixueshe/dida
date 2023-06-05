import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { inputStateMachine, search } from './search'

describe('Search', () => {
  // 这里其实只是检测了状态
  // 其实还可以扩展一下, 在这里把 searchCommands 和 searchTasks 都测试上
  it('should be that state is loadCompleted when input completed', async () => {
    vi.useFakeTimers()

    search.value = 'code'

    await nextTick()
    // handle watchDebounced
    // 下面2个 api 都可以
    //     vi.advanceTimersByTime(500)
    vi.advanceTimersToNextTimer()
    // TODO 这里其实是我自己模拟了 delay , 后面换成调用真实的逻辑后 我们可以  mock 掉 ,或者使用其他的办法
    // 所以下面两行代码是临时的
    // for delay search data
    await nextTick()
    vi.advanceTimersToNextTimer()
    // 这里还需要把最后一个 promise 解除掉才可以
    await nextTick()
    expect(inputStateMachine.state.value).toBe('loadCompleted')
  })

  it('reset', async () => {
    vi.useFakeTimers()

    search.value = 'code'

    await nextTick()
    // 下面2个 api 都可以
    // handle watchDebounced
    //     vi.advanceTimersByTime(500)
    vi.advanceTimersToNextTimer()
    // TODO 这里其实是我自己模拟了 delay , 后面换成调用真实的逻辑后 我们可以  mock 掉 ,或者使用其他的办法
    // 所以下面两行代码是临时的
    // for delay search data
    await nextTick()
    vi.advanceTimersToNextTimer()
    // 这里还需要把最后一个 promise 解除掉才可以
    await nextTick()

    // -----------上面都是处理 watchDebounced 的---------------
    // 现在处理 watch search.value = ""
    search.value = ''

    await nextTick()
    expect(inputStateMachine.state.value).toBe('waitingForInput')
  })
})
