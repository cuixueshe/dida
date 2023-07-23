<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'

import { reactive, ref } from 'vue'
import type { FormInst } from 'naive-ui'
import {
  createConfirmPasswordRule,
  createPasswordRule,
  createUsernameRule,
} from './rules'
import { useUserStore } from '@/store'
import { useGoto } from '@/composables/goto'

interface SignUpFormValue {
  username: string
  password: string
  confirmPassword: string
}

const userStore = useUserStore()
const { gotoHome } = useGoto()

const formRef = ref<FormInst | null>(null)
const formValue = reactive<SignUpFormValue>({
  username: '',
  password: '',
  confirmPassword: '',
})

const rules = {
  username: createUsernameRule(),
  password: createPasswordRule(),
  confirmPassword: createConfirmPasswordRule(formValue),
}

function handleSignUp(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await userStore.signUp({
        username: formValue.username,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
      })

      gotoHome()
    }
  })
}
</script>

<template>
  <NForm ref="formRef" :model="formValue" :rules="rules">
    <NFormItem label="帐号" path="username">
      <NInput v-model:value="formValue.username" placeholder="输入帐号" />
    </NFormItem>
    <NFormItem label="密码" path="password">
      <NInput
        v-model:value="formValue.password"
        type="password"
        placeholder="输入密码"
      />
    </NFormItem>

    <NFormItem label="确认密码" path="confirmPassword">
      <NInput
        v-model:value="formValue.confirmPassword"
        type="password"
        placeholder="确认密码"
      />
    </NFormItem>
    <NFormItem>
      <NButton
        attr-type="button"
        type="primary"
        block
        secondary
        strong
        @click="handleSignUp"
      >
        注册
      </NButton>
    </NFormItem>
  </NForm>
</template>

<style scoped></style>
