<script setup lang="ts">
import { NModal } from 'naive-ui'
import { provide, ref } from 'vue'
import CommandBody from './CommandBody.vue'

const showCommand = ref(false)
const commandBody = ref<InstanceType<typeof CommandBody>>()

provide('closeModal', () => [
  showCommand.value = false,
  commandBody.value?.reset(),
])

defineExpose({
  show() {
    showCommand.value = true
  },
})
</script>

<template>
  <NModal v-model:show="showCommand" display-directive="show">
    <CommandBody ref="commandBody" />
  </NModal>
</template>

<style scoped></style>
