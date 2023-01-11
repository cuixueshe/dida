<script setup lang="ts">
import { NButton, NModal } from 'naive-ui'
import { ref } from 'vue'
import CommandBody from './CommandBody.vue'

const showCommand = ref(false)
</script>

<template>
  <div>
    <NButton @click="showCommand = !showCommand">
      CLick me
    </NButton>
    <NModal v-model:show="showCommand">
      <CommandBody />
    </NModal>
  </div>
</template>

<style scoped></style>
