<script setup lang="ts">
import InkMde from 'ink-mde/vue'
import { debounce } from 'lodash-es'
import { useTasksStore, useThemeStore } from '@/store'

const tasksStore = useTasksStore()
const themeStore = useThemeStore()

function handleInput(e: Event) {
  if (tasksStore.currentActiveTask)
    tasksStore.updateTaskTitle(tasksStore.currentActiveTask, (e.target as HTMLElement).innerText)
}

function handleAfterUpdate(doc: string) {
  if (tasksStore.currentActiveTask)
    tasksStore.updateTaskContent(tasksStore.currentActiveTask, doc)
}

const waitTime = 700
const debounceHandleInput = debounce(handleInput, waitTime)
const debounceHandleAfterUpdate = debounce(handleAfterUpdate, waitTime)
</script>

<template>
  <div>
    <div v-if="tasksStore.currentActiveTask">
      <h1 contenteditable="true" class="text-3xl" @input="debounceHandleInput">
        {{ tasksStore.currentActiveTask.title }}
      </h1>
      <div class="mt-2">
        <InkMde
          v-model="tasksStore.currentActiveTask.content"
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
