<script setup lang="ts">
import InkMde from 'ink-mde/vue'
import { debounce } from 'lodash-es'
import { useThemeStore } from '@/store'
import { useTaskStore } from '@/store/tasks'

const taskStore = useTaskStore()
const themeStore = useThemeStore()

function handleInput(e: Event) {
  if (taskStore.currentActiveTask)
    taskStore.updateTaskTitle(taskStore.currentActiveTask, (e.target as HTMLElement).innerText)
}

function handleAfterUpdate(doc: string) {
  if (taskStore.currentActiveTask)
    taskStore.updateTaskContent(taskStore.currentActiveTask, doc)
}

const waitTime = 700
const debounceHandleInput = debounce(handleInput, waitTime)
const debounceHandleAfterUpdate = debounce(handleAfterUpdate, waitTime)
</script>

<template>
  <div>
    <div v-if="taskStore.currentActiveTask">
      <h1 contenteditable="true" class="text-3xl" @input="debounceHandleInput">
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
              afterUpdate: debounceHandleAfterUpdate,
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
