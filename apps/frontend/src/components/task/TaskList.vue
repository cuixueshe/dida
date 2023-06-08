<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import draggable from 'vuedraggable'
import { SmartProjectNames, isSmartProject, updateTaskPosition } from 'services/task'
import TaskItem from './TaskItem.vue'
import {
  useTaskLeftMenuStatusStore,
  useThemeStore,
} from '@/store'
import { useTaskStore as useNewTaskStore } from '@/store/tasks'

const newTaskStore = useNewTaskStore()
const themeStore = useThemeStore()
const taskLeftMenuStatusStore = useTaskLeftMenuStatusStore()

function useInput() {
  const inputRef: Ref<HTMLInputElement | null> = ref(null)

  function onFocus() {
    inputRef.value!.focus()
  }

  return {
    inputRef,
    onFocus,
  }
}

const taskTitle = ref('')
const dragging = ref<boolean>(false)

const placeholderText = computed(() => {
  return `添加任务至“${newTaskStore.currentActiveProject?.name}”，回车即可保存`
})
const isPlaceholder = computed(() => {
  return taskTitle.value.length === 0
})

function addTask() {
  if (!taskTitle.value)
    return
  if (Reflect.has(newTaskStore.currentActiveProject, 'color'))
    newTaskStore.addTaskToTag(taskTitle.value)
  else newTaskStore.addTask(taskTitle.value)

  taskTitle.value = ''
}

function toggleLeftMenu() {
  taskLeftMenuStatusStore.toggle()
}

function handleInputChange(event: any) {
  taskTitle.value = event.target.value
}

const shouldShowTodoAdd = computed(() => {
  const name = newTaskStore.currentActiveProject?.name || ''
  return !isSmartProject(name)
})

const shouldEnabledDrag = computed(() =>
  !Object.values(SmartProjectNames).includes(
    newTaskStore.currentActiveProject?.name as SmartProjectNames,
  ),
)

const { inputRef, onFocus } = useInput()

function handleEndDrag(e: any) {
  dragging.value = false

  const currentTask = newTaskStore.tasks[e.newIndex]
  const currentIndex = newTaskStore.tasks.length - 1 - e.newIndex
  newTaskStore.updateTaskPosition(currentTask!, currentIndex)

  if (e.newIndex > e.oldIndex) {
    for (let i = e.oldIndex; i < e.newIndex; i++) {
      const exchangedIndex = newTaskStore.tasks.length - 1 - i
      newTaskStore.updateTaskPosition(newTaskStore.tasks[i], exchangedIndex)
    }
  }
  else {
    for (let i = e.newIndex + 1; i < e.oldIndex + 1; i++) {
      const exchangedIndex = newTaskStore.tasks.length - 1 - i
      newTaskStore.updateTaskPosition(newTaskStore.tasks[i], exchangedIndex)
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div flex items-center>
      <Icon
        :icon="
          taskLeftMenuStatusStore.visible
            ? 'tabler:layout-sidebar-left-collapse'
            : 'tabler:layout-sidebar-right-collapse'
        "
        width="30"
        @click="toggleLeftMenu()"
      />
      <h1 class="text-4xl ml-5px">
        {{ newTaskStore.currentActiveProject?.name }}
      </h1>
    </div>
    <div
      v-show="shouldShowTodoAdd"
      class="relative cursor-text"
      @click="onFocus"
    >
      <input
        ref="inputRef"
        :value="taskTitle"
        type="text"
        class="w-100% min-w-300px h-38px rounded-6px p-4px pl-12px pr-12px outline-none border-1 b-transparent bg-gray-100 dark:bg-#3B3B3B"
        @input="handleInputChange"
        @keypress.enter="addTask"
      >
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
    <draggable
      :list="newTaskStore.tasks"
      :ghost-class="themeStore.isDark ? 'dark-ghost' : 'ghost'"
      :drag-class="themeStore.isDark ? 'dark-drag' : 'drag'"
      item-key="id"
      :animation="200"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !dragging ? 'flip-list' : null,
      }"
      class="flex flex-col gap-10px"
      :disabled="!shouldEnabledDrag"
      @start="dragging = true"
      @end="handleEndDrag"
    >
      <template #item="{ element, index }">
        <TaskItem
          :project="newTaskStore.currentActiveProject"
          :task="element"
          :index="index"
          :is-show-drag-icon="shouldEnabledDrag"
          class="item"
        />
      </template>
    </draggable>
    <!-- 暂时性修复 contenteditable 的 bug #9 -->
    <div class="w-full h-1px" contenteditable="false" />
  </div>
</template>

<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.dark-ghost {
  opacity: 0.4;
  background: #2f2f2f;
}

.drag {
  opacity: 0.5;
  background: #c8ebfb;
}

.dark-drag {
  opacity: 0.4;
  background: #2f2f2f;
}
</style>
