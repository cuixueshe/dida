<template>
  <div @click="handleClick">
    {{ task.title }}
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '../../store'
import type { Task } from '../../store/task'

const taskStore = useTaskStore()

interface Props {
  task: Task
}

const props = defineProps<Props>()


function handleClick() {
  taskStore.changeActiveTask(props.task)
}

</script>

<style scoped>

</style>