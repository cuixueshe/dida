import { describe, expect, it, vi } from 'vitest'
import { GITHUB_URL, goToLogin, openGithub, useGoto } from '../goto'
import { setupRouter, useSetup } from '@/tests/helper'
import { RouteNames } from '@/router/const'
import { routes } from '@/router'

describe('the header', () => {
  it('should be go to home page', () => {
    const { router } = useSetup(() => {
      const { gotoHome } = useGoto()
      gotoHome()
    })

    expect(router.push).toBeCalledWith({ name: RouteNames.HOME })
  })

  it('should be go to settings page', () => {
    const { router } = useSetup(() => {
      const { gotoSettings } = useGoto()

      gotoSettings()
    })

    expect(router.push).toBeCalledWith({ name: RouteNames.SETTINGS })
  })

  it('should be go to github', async () => {
    window.open = vi.fn()

    openGithub()

    expect(window.open).toBeCalledWith(GITHUB_URL)
  })

  it('should go to the login page ', async () => {
    const router = setupRouter({ routes })

    goToLogin()

    expect(router.replace).toBeCalledWith({ name: RouteNames.LOGIN })
  })
})
