<script setup lang="ts">
import { ref } from 'vue'
import TheHeader from '@/components/header/TheHeader.vue'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TaskList from '@/components/task/TaskList.vue'
import { useTaskSidebarDrag } from '@/composable/useTaskSidebarDrag'

const AREA_MIN_WIDTH = 240

const leftResizeElement = ref<HTMLDivElement>()
const rightResizeElement = ref<HTMLDivElement>()
const boxContainerElement = ref<HTMLDivElement>()
const leftContainerElement = ref<HTMLDivElement>()
const rightContainerElement = ref<HTMLDivElement>()
const { useDividerLeftDrag, useDividerRightDrag } = useTaskSidebarDrag(
  AREA_MIN_WIDTH,
  leftResizeElement,
  rightResizeElement,
  boxContainerElement,
  leftContainerElement,
  rightContainerElement,
)
</script>

<template>
  <div
    class="w-full bg-gray-100 text-black dark:bg-#18181c dark:text-white h-40px px-1% flex justify-between items-center text-16px"
  >
    <div>Vue3 Todo App Real-World</div>
    <TheHeader />
  </div>
  <div
    ref="boxContainerElement"
    class="!h-[calc(100vh-40px)] flex p-10px pt-0 overflow-hidden dark:bg-#18181c dark:text-white"
  >
    <div
      ref="leftContainerElement"
      :style="{ flex: `0 0 ${AREA_MIN_WIDTH}px` }"
    >
      <TaskLeftListView />
    </div>
    <div
      ref="leftResizeElement"
      class="border-solid cursor-w-resize h-screen border-1 opacity-60 hover-opacity-100"
      style="flex: 0 0 1px"
      title="收缩侧边栏"
      @mousedown.prevent="useDividerLeftDrag"
    />
    <div class="flex-1 flex w-full h-full p-24px">
      <TaskList class="w-full" />
    </div>
    <div
      ref="rightResizeElement"
      class="border-solid cursor-w-resize h-screen border-1 opacity-60 hover-opacity-100"
      style="flex: 0 0 1px"
      title="收缩侧边栏"
      @mousedown.prevent="useDividerRightDrag"
    />
    <div
      ref="rightContainerElement"
      class="flex w-full h-full p-24px"
      :style="{ flex: `0 0 ${AREA_MIN_WIDTH}px` }"
    >
      <TaskEditor class="w-full" />
    </div>
  </div>
</template>
