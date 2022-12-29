<template>
  <div class="flex justify-start items-center gap-5px">
    <button :class="[
  checkboxColors[task.state],
]" class="w-5 h-5 rounded-1" @click="handleCompleteTodo">
    </button>
    <div class="w-full cursor-pointer" contenteditable="true" @input="handleInput" @click="handleClickTask(task)"
      @click.right="handleRightClickTask($event, task)">
      {{ task.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task, TaskState } from "@/store/task";
import { useTaskStore } from "@/store";
import { useTaskRightContextMenu } from "@/composable/taskRightContextMenu";

interface Props {
  task: Task;
}

const checkboxColors: Record<TaskState, string> = {
  [TaskState.ACTIVE]: "bg-#ccc",
  [TaskState.COMPLETED]: "bg-#007A78",
  [TaskState.GIVE_UP]: "bg-#FF2200",
  [TaskState.REMOVED]: "bg-#ccc",
};

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