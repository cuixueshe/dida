<template>
  <div
    @click.right="handleRightClickTask($event, task)"
    @click="handleClickTask(task)"
  >
    <div class="flex">
      <div class="w-4 h-4 bg-blue-400" @click="handleCompleteTodo"></div>
      <div class="w-full" contenteditable="true" @input="handleInput">
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from "../../store/task";
import { useTaskStore } from "../../store";
import { useTaskRightContextMenu } from "../../composable/taskRightContextMenu";

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const taskStore = useTaskStore();
const { showContextMenu } = useTaskRightContextMenu();

function handleRightClickTask(e: MouseEvent, task: Task) {
  taskStore.changeActiveTask(task);
  showContextMenu(e);
}

function handleClickTask(task: Task) {
  taskStore.changeActiveTask(task);
}

function handleInput(e: Event) {
  taskStore.setCurrentActiveTaskTitle((e.target as HTMLElement).innerText);
}

function handleCompleteTodo () {
  // 看看应该是恢复 task  还是完成 task
  taskStore.completeTask(props.task)
  
}
</script>

<style scoped></style>
