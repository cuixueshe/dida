<script setup lang="ts">
import { ref } from 'vue'
import TheHeader from '@/components/header/TheHeader.vue'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TaskList from '@/components/task/TaskList.vue'

const AREA_MIN_WIDTH = 240
const AREA_MAX_WIDTH = 360

const leftResizeRef = ref()
const rightResizeRef = ref()
const boxContainerRef = ref()
const leftContainerRef = ref()
const rightContainerRef = ref()

function handleRightDrag(e: MouseEvent) {
  const startX = e.clientX
  const offsetLeft = rightResizeRef.value.offsetLeft

  document.onmousemove = (event: MouseEvent) => {
    document.body.style.cursor = 'w-resize'
    const endX = event.clientX
    let moveDistance = offsetLeft + (endX - startX)
    // container - padding - divider
    const space
      = boxContainerRef.value.clientWidth
      - 10
      - leftResizeRef.value.offsetWidth
      - rightResizeRef.value.offsetWidth

    if (moveDistance > space - AREA_MIN_WIDTH)
      moveDistance = space - AREA_MIN_WIDTH

    if (moveDistance < space - AREA_MAX_WIDTH)
      moveDistance = space - AREA_MAX_WIDTH
    rightContainerRef.value.style = `flex: 0 0 ${space - moveDistance}px`
  }
  // release
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    document.body.style.cursor = 'default'
  }
}

function handleLeftDrag(e: MouseEvent) {
  const startX = e.clientX
  const offsetLeft = leftResizeRef.value.offsetLeft

  document.onmousemove = (event: MouseEvent) => {
    document.body.style.cursor = 'w-resize'
    const endX = event.clientX
    let moveDistance = offsetLeft + (endX - startX)

    if (moveDistance < AREA_MIN_WIDTH)
      moveDistance = AREA_MIN_WIDTH
    if (moveDistance > AREA_MAX_WIDTH)
      moveDistance = AREA_MAX_WIDTH

    leftContainerRef.value.style = `flex: 0 0 ${moveDistance}px`
  }
  // release
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    document.body.style.cursor = 'default'
  }
}
</script>

<template>
  <div
    class="w-full bg-gray-100 text-black dark:bg-#18181c dark:text-white h-40px px-1% flex justify-between items-center text-16px"
  >
    <div>Vue3 Todo App Real-World</div>
    <TheHeader />
  </div>
  <div
    ref="boxContainerRef"
    class="!h-[calc(100vh-40px)] flex p-10px pt-0 overflow-hidden dark:bg-#18181c dark:text-white"
  >
    <div ref="leftContainerRef" :style="{ flex: `0 0 ${AREA_MIN_WIDTH}px` }">
      <TaskLeftListView />
    </div>
    <div
      ref="leftResizeRef"
      class="border-solid cursor-w-resize h-screen border-1"
      style="flex: 0 0 1px"
      title="收缩侧边栏"
      @mousedown.prevent="handleLeftDrag"
    />
    <div class="flex-1 flex w-full h-full p-24px">
      <TaskList class="w-full" />
    </div>
    <div
      ref="rightResizeRef"
      class="border-solid cursor-w-resize h-screen border-1"
      style="flex: 0 0 1px"
      title="收缩侧边栏"
      @mousedown.prevent="handleRightDrag"
    />
    <div
      ref="rightContainerRef"
      class="flex w-full h-full p-24px"
      :style="{ flex: `0 0 ${AREA_MIN_WIDTH}px` }"
    >
      <TaskEditor class="w-full" />
    </div>
  </div>
</template>
