<template>
  <div>
    <div v-if="taskStore.currentActiveTask">
      <h1 contenteditable="true" @input="handleInput">
        {{ taskStore.currentActiveTask.title }}
      </h1>
      <div>
        <InkMde v-model="taskStore.currentActiveTask.content" />
      </div>
    </div>
    <div v-else>
      点击任务标题查看详情
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '../../store/task'
import InkMde from 'ink-mde/vue'

const taskStore = useTaskStore()

function handleInput (e:Event) {
  taskStore.setCurrentActiveTaskTitle((e.target as HTMLElement).innerText)
}

</script>

<style scoped>

</style>