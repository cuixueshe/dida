<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import TheHeader from '@/components/header/TheHeader.vue'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TaskList from '@/components/task/TaskList.vue'

const AREA_MIN_WIDTH = 240
const LEFT_AREA_MAX_WIDTH = 360
const RIGHT_AREA_MAX_WIDTH = 800

const leftResizeRef = ref()
const rightResizeRef = ref()
const boxContainerRef = ref()
const leftContainerRef = ref()
const rightContainerRef = ref()

function getContainerHorizontalPadding(handler: Ref) {
  const computedStyle = getComputedStyle(handler.value)
  return (
    parseFloat(computedStyle.getPropertyValue('padding-left'))
    + parseFloat(computedStyle.getPropertyValue('padding-right'))
  )
}

function useCalculateMoveDistance(
  offsetLeft: number,
  startX: number,
  endX: number,
  direction: 'left' | 'right',
) {
  let moveDistance = offsetLeft + (endX - startX)
  if (direction === 'left') {
    if (moveDistance < AREA_MIN_WIDTH)
      moveDistance = AREA_MIN_WIDTH
    if (moveDistance > LEFT_AREA_MAX_WIDTH)
      moveDistance = LEFT_AREA_MAX_WIDTH
  }
  else {
    const space
      = boxContainerRef.value.clientWidth
      - getContainerHorizontalPadding(boxContainerRef) / 2

    if (moveDistance > space - AREA_MIN_WIDTH)
      moveDistance = space - AREA_MIN_WIDTH

    if (moveDistance < space - RIGHT_AREA_MAX_WIDTH)
      moveDistance = space - RIGHT_AREA_MAX_WIDTH
    moveDistance = space - moveDistance
  }
  return moveDistance
}

function handleDrag(e: MouseEvent, direction: 'left' | 'right') {
  const startX = e.clientX
  let offsetLeft: number

  direction === 'left'
    ? offsetLeft = leftResizeRef.value.offsetLeft
    : offsetLeft = rightResizeRef.value.offsetLeft

  document.onmousemove = (event: MouseEvent) => {
    document.body.style.cursor = 'ew-resize'
    const endX = event.clientX
    const moveDistance = useCalculateMoveDistance(
      offsetLeft,
      startX,
      endX,
      direction,
    )
    const expression = `flex: 0 0 ${moveDistance}px`

    direction === 'left'
      ? (leftContainerRef.value.style = expression)
      : (rightContainerRef.value.style = expression)
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
      class="border-solid cursor-w-resize h-screen border-1 opacity-60 hover-opacity-100"
      style="flex: 0 0 1px"
      title="收缩侧边栏"
      @mousedown.prevent="e => handleDrag(e, 'left')"
    />
    <div class="flex-1 flex w-full h-full p-24px">
      <TaskList class="w-full" />
    </div>
    <div
      ref="rightResizeRef"
      class="border-solid cursor-w-resize h-screen border-1 opacity-60 hover-opacity-100"
      style="flex: 0 0 1px"
      title="收缩侧边栏"
      @mousedown.prevent="(e) => handleDrag(e, 'right')"
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
