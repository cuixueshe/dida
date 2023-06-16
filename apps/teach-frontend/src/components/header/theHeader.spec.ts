import { describe, expect, it } from 'vitest'
import { useGoto } from './theHeader'
import { useSetup } from '@/tests/helper'

describe('the header', () => {
  it('should be go to home page', () => {
    const { router } = useSetup(() => {
      const { goToHome } = useGoto()
      goToHome()
    })

    expect(router.push).toBeCalledWith({ name: 'Home' })
  })

  it('should be go to settings page', () => {
    const { router } = useSetup(() => {
      const { goToSettings } = useGoto()

      goToSettings()
    })

    expect(router.push).toBeCalledWith({ name: 'Settings' })
  })
})
