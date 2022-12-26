<template>
  <div>
    <div>
      <h1 class="text-4xl">{{ taskStore.currentActiveProject?.name }}</h1>
    </div>
    <div>
      <input
        type="text"
        placeholder="添加任务，回车即可创建"
        @keypress.enter="addTask"
        v-model="taskTitle"
      />
    </div>
    <div>
      <ul v-for="task in taskStore.currentActiveProject?.taskList">
        <TaskItem :task="task"></TaskItem>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskItem from "./TaskItem.vue";
import { useTaskStore } from "../../store/task";
import { ref } from "vue";

const taskStore = useTaskStore();

const taskTitle = ref("");

function addTask() {
  taskStore.addTask(taskTitle.value);
  taskTitle.value = "";
}
</script>

<style scoped></style>
