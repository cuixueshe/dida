import { describe, expect, it, vi } from 'vitest'
import { useSetup } from '../../tests/test-helper'
import { useGoto } from './theHeader'

describe('theHeader', () => {
  it('should be go to Settings', () => {
    const { router } = useSetup(() => {
      const { gotoSettings } = useGoto()
      gotoSettings()
    })

    expect(router.push).toBeCalledWith({ name: 'Settings' })
  })

  it('should be go to Home', () => {
    const { router } = useSetup(() => {
      const { gotoHome } = useGoto()
      gotoHome()
    })

    expect(router.push).toBeCalledWith({ name: 'Home' })
  })

  it('should be go to github', () => {
    window.open = vi.fn()

    useSetup(() => {
      const { gotoGithub } = useGoto()
      gotoGithub()
    })

    expect(window.open).toBeCalledWith('https://github.com/cuixueshe/dida')
  })
})
