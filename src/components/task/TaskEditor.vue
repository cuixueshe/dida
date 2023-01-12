<script setup lang="ts">
import InkMde from 'ink-mde/vue'
import { useTaskStore, useThemeStore } from '@/store'

const taskStore = useTaskStore()
const themeStore = useThemeStore()

function handleInput(e: Event) {
  if (taskStore.currentActiveTask)
    taskStore.currentActiveTask.title = (e.target as HTMLElement).innerText
}
</script>

<template>
  <div>
    <div v-if="taskStore.currentActiveTask">
      <h1 contenteditable="true" class="text-3xl leading-normal px-5px" @input="handleInput">
        {{ taskStore.currentActiveTask.title }}
      </h1>
      <div class="mt-2">
        <InkMde
          v-model="taskStore.currentActiveTask.content"
          :options="{
            interface: {
              appearance: themeStore.isDark ? 'dark' : 'light',
            },
          }"
        />
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full justify-center items-center">
      <img src="@/assets/empty-task-detail-icon.svg" alt="Empty Task Detail Icon">
      <span class="text-[16px] pb-30">点击任务标题查看详情</span>
    </div>
  </div>
</template>
