import type { MessageOptions, MessageReactive } from 'naive-ui'
import { message } from './discreteApi'
import { router } from '@/router'
import { RouteNames } from '@/router/const'

type RequiredMessageReactive = Required<MessageReactive>
type ContentType = RequiredMessageReactive['content']

export function messageError(content: ContentType, options?: MessageOptions) {
  return message.error(content, options)
}

export function messageInfo(content: ContentType, options?: MessageOptions) {
  return message.info(content, options)
}

export function messageRedirectToSignIn(redirectPath: string) {
  message.info('Redirect to sign in...', {
    duration: 1000,
    onLeave() {
      router.replace({
        name: RouteNames.LOGIN,
        query: { redirect: redirectPath },
      })
    },
  })
}
