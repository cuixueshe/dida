<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TaskList from '@/components/task/TaskList.vue'
import { useTaskSidebarDrag } from '@/composables'
import { useListProjectsStore, useTaskLeftMenuStatusStore, useThemeStore } from '@/store'

const themeStore = useThemeStore()
const projectsStore = useListProjectsStore()

onBeforeMount(async () => {
  await projectsStore.init()
})

const AREA_MIN_WIDTH = 240

const leftResizeElement = ref<HTMLDivElement>()
const rightResizeElement = ref<HTMLDivElement>()
const boxContainerElement = ref<HTMLDivElement>()
const leftContainerElement = ref<HTMLDivElement>()
const rightContainerElement = ref<HTMLDivElement>()
const leftWidthFlex = ref<string>(`flex: 0 0 ${AREA_MIN_WIDTH}px`)
const rightWidthFlex = ref<string>(`flex: 0 0 ${AREA_MIN_WIDTH}px`)
const { useDividerLeftDrag, useDividerRightDrag } = useTaskSidebarDrag(
  AREA_MIN_WIDTH,
  leftResizeElement,
  rightResizeElement,
  boxContainerElement,
  leftContainerElement,
  rightContainerElement,
  leftWidthFlex,
  rightWidthFlex,
  themeStore,
)
const taskLeftMenuStatusStore = useTaskLeftMenuStatusStore()
</script>

<template>
  <div
    ref="boxContainerElement"
    class="!h-[calc(100vh-40px)] flex p-10px pt-0 overflow-hidden base-color"
  >
    <div
      v-if="taskLeftMenuStatusStore.visible"
      ref="leftContainerElement"
      :style="leftWidthFlex"
    >
      <TaskLeftListView />
    </div>
    <div
      v-if="taskLeftMenuStatusStore.visible"
      ref="leftResizeElement"
      class="border-solid cursor-w-resize h-screen border-l-2px opacity-60 hover-opacity-100"
      style="flex: 0 0 6px"
      title="收缩侧边栏"
      @mousedown.prevent="useDividerLeftDrag"
    />
    <div class="flex-1 flex w-full h-full p-24px min-w-300px">
      <TaskList class="w-full" />
    </div>
    <div
      ref="rightResizeElement"
      class="border-solid cursor-w-resize h-screen border-l-2px opacity-60 hover-opacity-100"
      style="flex: 0 0 6px"
      title="收缩侧边栏"
      @mousedown.prevent="useDividerRightDrag"
    />
    <div
      ref="rightContainerElement"
      class="flex w-full h-full p-24px"
      :style="rightWidthFlex"
    >
      <TaskEditor class="w-full h-full" />
    </div>
  </div>
</template>
