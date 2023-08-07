<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useDrag, useTaskLeftMenu } from '@/composables'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TaskList from '@/components/task/TaskList.vue'
import { useListProjectsStore } from '@/store'

const projectsStore = useListProjectsStore()
const { taskLeftMenuVisible } = useTaskLeftMenu()

onBeforeMount(async () => {
  await projectsStore.init()
})

function useLeftDrag(el: Ref<HTMLDivElement | undefined>) {
  const leftWidth = ref(240)
  const leftWidthStyle = computed(() => {
    return `flex: 0 0 ${leftWidth.value}px`
  })

  onMounted(() => {
    const x = el.value?.getBoundingClientRect().x || 0

    useDrag({
      el: el.value!,
      moveRange: [x - 50, x + 150],
      onMove(moveDistance) {
        leftWidth.value += moveDistance
      },
    })
  })

  return {
    leftWidthStyle,
  }
}

function useRightDrag(el: Ref<HTMLDivElement | undefined>) {
  const rightWidth = ref(240)
  const rightWidthStyle = computed(() => {
    return `flex: 0 0 ${rightWidth.value}px`
  })

  onMounted(() => {
    const x = el.value?.getBoundingClientRect().x || 0

    useDrag({
      el: el.value!,
      moveRange: [x - 400, x],
      onMove(moveDistance) {
        rightWidth.value -= moveDistance
      },
    })
  })

  return {
    rightWidthStyle,
  }
}

const leftResizeElement = ref<HTMLDivElement>()
const { leftWidthStyle } = useLeftDrag(leftResizeElement)

const rightResizeElement = ref<HTMLDivElement>()
const { rightWidthStyle } = useRightDrag(rightResizeElement)
</script>

<template>
  <div
    ref="boxContainerElement"
    class="!h-[calc(100vh-40px)] flex p-10px pt-0 overflow-hidden base-color"
  >
    <template v-if="taskLeftMenuVisible">
      <div :style="leftWidthStyle">
        <TaskLeftListView />
      </div>
      <div
        ref="leftResizeElement"
        class="border-solid cursor-col-resize h-screen border-l-2px opacity-60 hover-opacity-100"
        style="flex: 0 0 6px"
        title="收缩侧边栏"
      />
    </template>
    <div class="flex-1 flex w-full h-full p-24px min-w-300px">
      <TaskList class="w-full" />
    </div>
    <div
      ref="rightResizeElement"
      class="border-solid cursor-col-resize h-screen border-l-2px opacity-60 hover-opacity-100"
      style="flex: 0 0 6px"
      title="收缩侧边栏"
    />
    <div class="flex w-full h-full p-24px" :style="rightWidthStyle">
      <TaskEditor class="w-full h-full" />
    </div>
  </div>
</template>
