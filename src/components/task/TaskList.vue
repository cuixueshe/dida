<script setup lang="ts">
import { ref } from 'vue'
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '@/store/task'

const taskStore = useTaskStore()

const taskTitle = ref('')

function addTask() {
  taskStore.addTask(taskTitle.value)
  taskTitle.value = ''
}
</script>

<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div>
      <h1 class="text-4xl">
        {{ taskStore.currentActiveProject?.name }}
      </h1>
    </div>
    <div>
      <input
        v-show="taskStore.shouldShowTodoAdd()" v-model="taskTitle" type="text" placeholder="添加任务，回车即可创建"
        class="w-300px h-30px
      rounded-6px p-4px pl-12px outline-none
      border-none box-content bg-gray-200 dark:bg-#3B3B3B" @keypress.enter="addTask"
      >
    </div>
    <TransitionGroup name="list" tag="ul" class="flex flex-col gap-10px">
      <li v-for="task in taskStore.currentActiveProject?.taskList" :key="task.getId()">
        <TaskItem :task="task" />
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
