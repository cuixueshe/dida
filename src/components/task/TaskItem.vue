<template>
  <div @click.right="handleRightClickTask($event, task)" @click="handleClickTask(task)">
    <div>
      {{ task.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from '../../store/task'
import { useTaskStore } from '../../store'
import { useTaskRightContextMenu } from '../../composable/taskRightContextMenu'

interface Props {
  task: Task
}

defineProps<Props>()

const taskStore = useTaskStore()
const { showContextMenu } = useTaskRightContextMenu()


function handleRightClickTask(e: MouseEvent, task: Task) {
  taskStore.changeActiveTask(task)
  showContextMenu(e)
}

function handleClickTask(task: Task) {
  taskStore.changeActiveTask(task)
}

</script>

<style scoped>

</style>