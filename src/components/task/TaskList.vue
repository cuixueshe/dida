<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '@/store/task'

const taskStore = useTaskStore()

const taskTitle = ref('')

function addTask() {
  taskStore.addTask(taskTitle.value)
  taskTitle.value = ''
}

const isInputFocus = ref(false)
</script>

<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div>
      <h1 class="text-4xl">
        {{ taskStore.currentActiveProject?.name }}
      </h1>
    </div>
    <div
      class="flex rounded-6px border-1 dark:border-[#dcdfe6] relative"
      :style="{ 'border-color': isInputFocus ? '#409eff' : '#dcdfe6' }"
    >
      <input
        v-show="taskStore.shouldShowTodoAdd()"
        v-model="taskTitle"
        type="text"
        placeholder="+ 添加任务至&quot;快捷&quot;，回车即可保存"
        class="w-full h-40px p-4px pl-12px pr-40px outline-none box-border bg-transparent cursor-pointer relative z-1"
        @keypress.enter="addTask"
        @focus="isInputFocus = true"
        @blur="isInputFocus = false"
      >
      <div
        class="flex items-center h-[40px] px-[10px] input-icon-wrapper absolute right-0 top-0"
      >
        <Icon
          icon="material-symbols:keyboard-arrow-down"
          width="20"
          class="color-[#9D9FA3]"
          dark="color-white"
        />
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
.input-icon-wrapper::after {
  position: absolute;
  content: "";
  width: 1px;
  background-color: #dcdfe6;
  top: 12px;
  bottom: 12px;
  left: 0;
}
</style>
