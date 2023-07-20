import type { FormItemRule } from 'naive-ui'
import { validatePasswordLength, validatePasswordSame, validateUsernameLength } from './validator'

export function createUsernameRule() {
  return [
    {
      required: true,
      message: '请输入帐号',
      trigger: 'blur',
    },
    {
      validator(rule: FormItemRule, value: string) {
        return validateUsernameLength(value)
      },
      message: '长度要大于 6 小于 30',
      trigger: 'blur',
    },
  ]
}

export function createPasswordRule() {
  return [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },

    {
      validator(rule: FormItemRule, value: string) {
        return validatePasswordLength(value)
      },
      message: '长度要大于 6 小于 30',
      trigger: 'blur',
    },
  ]
}

export function createConfirmPasswordRule(formValue: { password: string }) {
  return [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
    {
      validator: (rule: FormItemRule, value: string) => {
        return validatePasswordSame(formValue.password, value)
      },
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input'],
    },
  ]
}
