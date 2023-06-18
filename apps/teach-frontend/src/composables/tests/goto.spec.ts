import { describe, expect, it, vi } from 'vitest'
import { GITHUB_URL, openGithub, useGoto } from '../goto'
import { useSetup } from '@/tests/helper'
import { RouteNames } from '@/router/const'

describe('the header', () => {
  it('should be go to home page', () => {
    const { router } = useSetup(() => {
      const { goToHome } = useGoto()
      goToHome()
    })

    expect(router.push).toBeCalledWith({ name: RouteNames.HOME })
  })

  it('should be go to settings page', () => {
    const { router } = useSetup(() => {
      const { goToSettings } = useGoto()

      goToSettings()
    })

    expect(router.push).toBeCalledWith({ name: RouteNames.SETTINGS })
  })

  it('should be go to github', async () => {
    window.open = vi.fn()

    openGithub()

    expect(window.open).toBeCalledWith(GITHUB_URL)
  })
})
