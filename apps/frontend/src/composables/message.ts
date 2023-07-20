import { createDiscreteApi } from 'naive-ui'

export const { message: Message } = createDiscreteApi(['message'])

export function messageRedirectToSignIn(onLeave?: () => void) {
  Message.info('Redirect to sign in...', {
    duration: 1000,
    onLeave,
  })
}
