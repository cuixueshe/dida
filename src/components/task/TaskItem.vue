<template>
  <div @click.right="handleRightClickTask($event, task)">
    <div class="flex">
      <template v-if="task.state === TaskState.REMOVED">
        <!-- 临时加的提示 后面要去掉 -->
        <div class="flex">
          <div>
            <n-popover trigger="hover">
              <template #trigger>
                <div class="w-4 h-4 bg-blue-400"></div>
              </template>
              <span>在垃圾桶里面的 Task 是不可以直接被恢复的哦</span>
            </n-popover>
          </div>
          <div class="w-full" @click="handleClickTask(task)">
            {{ task.title }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="w-4 h-4 bg-blue-400" @click="handleCompleteTodo"></div>
        <div
          class="w-full"
          contenteditable="true"
          @input="handleInput"
          @focus="handleClickTask(task)"
        >
          {{ task.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NPopover } from "naive-ui";
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

function handleCompleteTodo(e: Event) {
  if (props.task.state === TaskState.ACTIVE) {
    taskStore.completeTask(props.task);
  } else if (props.task.state === TaskState.COMPLETED) {
    taskStore.restoreTask(props.task);
  } else if (props.task.state === TaskState.REMOVED) {
    console.log("在垃圾桶里面的 task 不可以直接恢复");
  }
}
</script>

<style scoped></style>
