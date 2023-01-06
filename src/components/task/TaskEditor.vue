<script setup lang="ts">
import InkMde from 'ink-mde/vue'
import { useTaskStore } from '@/store'
import { isDark } from '@/composable/dark'

const taskStore = useTaskStore()

function handleInput(e: Event) {
  if (taskStore.currentActiveTask)
    taskStore.currentActiveTask.title = (e.target as HTMLElement).innerText
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
              appearance: isDark ? 'dark' : 'light',
            },
          }"
        />
      </div>
    </div>
    <div v-else>
      点击任务标题查看详情
    </div>
  </div>
</template>
