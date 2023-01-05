<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useEventListener } from "@vueuse/core";

import TaskItem from "./TaskItem.vue";
import { useTaskStore } from "@/store/task";

const taskStore = useTaskStore();

const taskTitle = ref("");
const inputRef: Ref<HTMLInputElement | null> = ref(null);

const placeholderText = computed(() => {
  return `添加任务至"${taskStore.currentActiveProject?.name}，回车即可保存`;
});
const isPlaceholder = computed(() => {
  return taskTitle.value.length === 0;
});

function addTask() {
  taskStore.addTask(taskTitle.value);
  taskTitle.value = "";
}

function onFocus() {
  inputRef.value!.focus();
}

useEventListener(
  () => inputRef.value,
  "focus",
  () => {
    const classList = inputRef.value!.classList;

    classList.add("border-blue");
    classList.add("dark:color-black");
    classList.remove("bg-gray-100");
    classList.remove("dark:bg-#3B3B3B");
  }
);

useEventListener(
  () => inputRef.value,
  "blur",
  () => {
    const classList = inputRef.value!.classList;

    classList.add("bg-gray-100");
    classList.add("dark:bg-#3B3B3B");

    classList.remove("border-blue");
    classList.remove("dark:color-black");
  }
);
</script>

<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div>
      <h1 class="text-4xl">
        {{ taskStore.currentActiveProject?.name }}
      </h1>
    </div>
    <div
      class="relative cursor-text"
      @click="onFocus"
      v-show="taskStore.shouldShowTodoAdd()"
    >
      <input
        ref="inputRef"
        v-model="taskTitle"
        type="text"
        class="w-100% min-w-300px h-38px rounded-6px p-4px pl-12px pr-12px outline-none border-1 b-transparent bg-gray-100 dark:bg-#3B3B3B"
        @keypress.enter="addTask"
      />
      <div
        v-show="isPlaceholder"
        class="w-100% min-w-300px absolute top-0 flex items-center h-38px p-4px pl-12px pr-12px border-1 b-transparent select-none color-gray:50"
      >
        <Icon
          icon="ic:baseline-plus"
          width="20"
          class="color-gray:50 pr-4px box-content"
        />
        {{ placeholderText }}
      </div>
    </div>
    <TransitionGroup name="list" tag="ul" class="flex flex-col gap-10px">
      <li v-for="task in taskStore.currentActiveProject?.tasks" :key="task.id">
        <TaskItem :task="task" />
      </li>
    </TransitionGroup>
    <!-- 暂时性修复 contenteditable 的 bug #9 -->
    <div class="w-full h-1px" contenteditable="false" />
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
