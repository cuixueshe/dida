<script setup lang="ts">
import { NEmpty, NInput } from 'naive-ui'
import { ref } from 'vue'

const searchWord = ref('')
</script>

<template>
  <div class="base-color w-200 h-120 rounded p-sm">
    <NInput v-model:value="searchWord" placeholder="通过关键字搜索，或添加 '>' 前缀开启命令模式" clearable />
    <div>
      <NEmpty description="搜索任务，标签或查看命令。">
        <template #icon />
      </NEmpty>
    </div>
  </div>
</template>

<style scoped></style>
