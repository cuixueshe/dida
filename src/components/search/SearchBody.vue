<script setup lang="ts">
import { NEmpty, NInput } from 'naive-ui'
import { ref } from 'vue'

const searchWord = ref('')
</script>

<template>
  <div class="base-color w-200 h-120 rounded p-sm">
    <NInput v-model:value="searchWord" placeholder="搜索" clearable>
      <template #prefix>
        <div i="carbon-search" />
      </template>
    </NInput>
    <div>
      <NEmpty description="搜索任务，标签，设置">
        <template #icon />
      </NEmpty>
    </div>
  </div>
</template>

<style scoped></style>
