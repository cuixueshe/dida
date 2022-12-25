<template>
  <div>
    <div v-if="taskStore.currentActiveTask">
      <h1>
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
import { useTaskStore } from '../../store'
import InkMde from 'ink-mde/vue'


const taskStore = useTaskStore()

</script>

<style scoped>

</style>