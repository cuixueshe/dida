<script setup lang="ts">
import { NModal } from 'naive-ui'
import { provide, ref } from 'vue'
import CommandBody from './CommandBody.vue'
import { useCommand } from './command'

// const showCommand = ref(false)
const commandBody = ref<InstanceType<typeof CommandBody>>()

const { show, registerKeyboardShortcut } = useCommand()
registerKeyboardShortcut()

provide('closeModal', () => [
  // showCommand.value = false,
  show.value = false,
  commandBody.value?.reset(),
])

defineExpose({
  show() {
    // showCommand.value = true
    show.value = true
  },
})
const updateShow = () => {
  // if (!showCommand.value)
  if (!show.value)
    commandBody.value?.reset()
}
</script>

<template>
  <NModal v-model:show="show" display-directive="show" @update:show="updateShow">
    <CommandBody ref="commandBody" />
  </NModal>
</template>

<style scoped></style>
