<script setup lang="ts">
import { NButton, NModal } from 'naive-ui'
import { provide, ref } from 'vue'
import CommandBody from './CommandBody.vue'

const showCommand = ref(false)
const commandBody = ref<InstanceType<typeof CommandBody>>()

provide('closeModal', () => [
  showCommand.value = false,
  commandBody.value?.reset(),
])
</script>

<template>
  <div>
    <NButton @click="showCommand = !showCommand">
      CLick me
    </NButton>
    <NModal v-model:show="showCommand" display-directive="show">
      <CommandBody ref="commandBody" />
    </NModal>
  </div>
</template>

<style scoped></style>
