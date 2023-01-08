<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useEventListener } from '@vueuse/core'
import draggable from 'vuedraggable'
import TaskItem from './TaskItem.vue'
import { SpecialProjectNames, useTaskStore } from '@/store'
import { isDark } from '@/composable/dark'

const taskStore = useTaskStore()

const taskTitle = ref('')

const placeholderText = computed(() => {
  return `添加任务至“${taskStore.currentActiveProject?.name}”，回车即可保存`
})
const isPlaceholder = computed(() => {
  return taskTitle.value.length === 0
})

function addTask() {
  taskStore.addTask(taskTitle.value)
  taskTitle.value = ''
}

const shouldShowTodoAdd = computed(() => {
  const name = taskStore.currentActiveProject?.name
  return (
    name !== (SpecialProjectNames.Complete as string)
    && name !== SpecialProjectNames.Trash
    && name !== SpecialProjectNames.Failed
    && name !== SpecialProjectNames.Abstract
  )
})

function useInput() {
  const inputRef: Ref<HTMLInputElement | null> = ref(null)
  useEventListener(
    () => inputRef.value,
    'blur',
    () => {
      const classList = inputRef.value!.classList

      classList.add('bg-gray-100')
      classList.add('dark:bg-#3B3B3B')

      classList.remove('border-blue')
      classList.remove('dark:color-black')
    },
  )

  useEventListener(
    () => inputRef.value,
    'focus',
    () => {
      const classList = inputRef.value!.classList

      classList.add('border-blue')
      classList.add('dark:color-black')
      classList.remove('bg-gray-100')
      classList.remove('dark:bg-#3B3B3B')
    },
  )

  function onFocus() {
    inputRef.value!.focus()
  }

  return {
    inputRef,
    onFocus,
  }
}

const { inputRef, onFocus } = useInput()

const dragging = ref<boolean>(false)
const checkMove = (e: any) => {
  const currentIndex = e.draggedContext.index
  const futureIndex = e.draggedContext.futureIndex
  // 貌似vue3的响应机制太牛了，taskstore的task顺序(currentActiveProject和projects中对应的部分)，直接就变了，不需要再手动去改变了
  // 如果后端要改，这个位置调用接口就行了
  // taskStore.exchangeTwoTaskByIndex(currentIndex, futureIndex)
}
</script>

<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div>
      <h1 class="text-4xl">
        {{ taskStore.currentActiveProject?.name }}
      </h1>
    </div>
    <div
      v-show="shouldShowTodoAdd"
      class="relative cursor-text"
      @click="onFocus"
    >
      <input
        ref="inputRef"
        v-model="taskTitle"
        type="text"
        class="w-100% min-w-300px h-38px rounded-6px p-4px pl-12px pr-12px outline-none border-1 b-transparent bg-gray-100 dark:bg-#3B3B3B"
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
      :list="taskStore.currentActiveProject?.tasks ?? []"
      :ghost-class="isDark ? 'dark-ghost' : 'ghost'"
      :drag-class="isDark ? 'dark-drag' : 'drag'"
      item-key="id"
      :animation="200"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !dragging ? 'flip-list' : null,
      }"
      class="flex flex-col gap-10px"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element, index }">
        <TaskItem :task="element" :index="index" class="item" />
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
