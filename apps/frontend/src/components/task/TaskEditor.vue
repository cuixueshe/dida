<script setup lang="ts">
import InkMde from 'ink-mde/vue'
import { changeTaskContent, changeTaskTitle } from 'services/task'
import { useTaskStore, useThemeStore } from '@/store'

const taskStore = useTaskStore()
const themeStore = useThemeStore()

function handleInput(e: Event) {
  if (taskStore.currentActiveTask)
    changeTaskTitle(taskStore.currentActiveTask, (e.target as HTMLElement).innerText)
}

function handleAfterUpdate(doc: string) {
  if (taskStore.currentActiveTask)
    changeTaskContent(taskStore.currentActiveTask, doc)
}
</script>

<template>
  <div>
    <div v-if="taskStore.currentActiveTask">
      <h1 contenteditable="true" class="text-3xl" @input="handleInput">
        {{ taskStore.currentActiveTask.title }}
      </h1>
      <div class="mt-2">
        <InkMde
          v-model="taskStore.currentActiveTask.content"
          :options="{
            interface: {
              appearance: themeStore.isDark ? 'dark' : 'light',
            },
            hooks: {
              afterUpdate: handleAfterUpdate,
            },
          }"
        />
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full justify-center items-center">
      <img
        src="@/assets/empty-task-detail-icon.svg" alt="Empty Task Detail Icon"
        class="w-192px h-200px"
      >
      <span class="text-[16px] pb-30">点击任务标题查看详情</span>
    </div>
  </div>
</template>
