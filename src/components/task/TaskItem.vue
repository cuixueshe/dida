<template>
  <div
    contenteditable="true"
    @click.right="handleRightClickTask($event, task)"
    @click="handleClickTask(task)"
    @input="handleInput"
  >
    <div>
      <span >
        {{ task.title }}
      </span>
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

function handleInput (e:Event) {
  taskStore.setCurrentActiveTaskTitle((e.target as HTMLElement).innerText)
}
</script>

<style scoped></style>
