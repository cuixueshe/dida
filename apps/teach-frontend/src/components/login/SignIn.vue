<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { reactive, ref } from 'vue'
import { createPasswordRule, createUsernameRule } from './rules'
import { useUserStore } from '@/store'
import { useGoto } from '@/composables/goto'

interface SignInFormValue {
  username: string
  password: string
}

const userStore = useUserStore()
const { gotoHome } = useGoto()

const formRef = ref<FormInst | null>(null)
const formValue = reactive<SignInFormValue>({
  username: '',
  password: '',
})

const rules = {
  username: createUsernameRule(),
  password: createPasswordRule(),
}

function handleSignIn(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await userStore.signIn(formValue.username, formValue.password)
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
    <NFormItem>
      <NButton
        attr-type="button"
        type="primary"
        block
        secondary
        strong
        @click="handleSignIn"
      >
        登录
      </NButton>
    </NFormItem>
  </NForm>
</template>

<style scoped></style>
