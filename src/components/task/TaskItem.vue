<template>
  <div @click.right="handleRightClickTask($event, task)" @click="handleClickTask(task)">
    <div class="flex justify-start items-center gap-5px">
      <div class="w-5 h-5 bg-#ccc rounded-1 cursor-pointer" @click="handleCompleteTodo"></div>
      <div class="w-full" contenteditable="true" @input="handleInput">
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task, TaskState } from "../../store/task";
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

function handleCompleteTodo() {
  if (props.task.state === TaskState.ACTIVE) {
    taskStore.completeTask(props.task);
  } else {
    taskStore.restoreTask(props.task);
  }
}
</script>