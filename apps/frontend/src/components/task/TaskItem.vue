<script setup lang="ts">
import { NPopover } from 'naive-ui'
import { ref } from 'vue'
import { useTaskOperationMessage, useTaskRightContextMenu } from '@/composables'
import { TaskStatus, useTasksStore, useThemeStore } from '@/store'
import type { Project, Task } from '@/store'

interface Props {
  task: Task
  isShowDragIcon: boolean
}

const props = defineProps<Props>()
const tasksStore = useTasksStore()
const themeStore = useThemeStore()
const { isHover, hoverEvents } = useHandleHover()

const { showCompleteMessage } = useTaskOperationMessage()
const { showContextMenu } = useTaskRightContextMenu()

const checkboxColors: Record<TaskStatus, string> = {
  [TaskStatus.ACTIVE]: 'bg-transparent',
  [TaskStatus.COMPLETED]: 'bg-#007A78',
  [TaskStatus.REMOVED]: 'bg-#ccc',
}
function useHandleHover() {
  const isHover = ref(false)
  const hoverEvents: Record<string, () => void> = {
    mouseover: () => isHover.value = true,
    mousemove: () => isHover.value = true,
    mouseleave: () => isHover.value = false,
  }
  return {
    isHover,
    hoverEvents,
  }
}

function handleRightClickTask(e: MouseEvent, task: Task) {
  tasksStore.changeActiveTask(task)
  showContextMenu(e)
}

function handleClickTask(task: Task) {
  tasksStore.changeActiveTask(task)
}

function handleInput(e: Event, task: Task) {
  const newTitle = (e.target as HTMLElement).innerText
  tasksStore.updateTaskTitle(task, newTitle)
}

function handleCompleteTodo(e: Event) {
  if (props.task.status === TaskStatus.ACTIVE) {
    tasksStore.completeTask(props.task)
    showCompleteMessage(props.task)
  }
  else if (props.task.status === TaskStatus.COMPLETED) {
    tasksStore.restoreTask(props.task)
  }
  else if (props.task.status === TaskStatus.REMOVED) {
    // eslint-disable-next-line no-console
    console.log('在垃圾桶里面的 task 不可以直接恢复')
  }
}
</script>

<template>
  <div
    :data-id="props.task.id" class="flex flex-row w-full items-center"
    @click.right="handleRightClickTask($event, task)" v-on="hoverEvents"
  >
    <i
      v-if="isHover && props.isShowDragIcon"
      class="cursor-move text-gray dark:text-white flex-shrink-0 i-mdi-format-align-justify opacity-75 hover:opacity-100"
    />
    <i v-else class="w-1.2em h-1.2em flex-shrink-0" />
    <div
      flex justify-start items-center gap-5px h-40px py-5px flex-1 pl-10px :class="[
        themeStore.isDark ? 'hover:bg-[#474747]/50' : 'hover:bg-[#ECF1FF]/50',
        tasksStore.currentActiveTask?.id === task.id
          ? themeStore.isDark
            ? '!bg-[#474747]'
            : '!bg-[#ECF1FF]'
          : '',
      ]"
    >
      <template v-if="task.status === TaskStatus.REMOVED">
        <!-- 临时加的提示 后面要去掉 -->
        <div class="flex justify-start items-center gap-5px">
          <NPopover trigger="hover">
            <template #trigger>
              <button :class="[checkboxColors[task.status]]" class="w-5 h-5 rounded-1" @click="handleCompleteTodo" />
            </template>
            <div>在垃圾桶里面的 Task 是不可以直接被恢复的哦</div>
          </NPopover>
        </div>
        <div class="w-full" @click="handleClickTask(task)">
          {{ task.title }}
        </div>
      </template>
      <template v-else>
        <button
          :class="[checkboxColors[task.status]]"
          class="w-5 h-5 rounded-1 border border-solid border-black opacity-75 dark:border-white hover:opacity-100"
          @click="handleCompleteTodo"
        />
        <div
          class="w-full cursor-pointer focus:outline-0" contenteditable="true" @input="handleInput($event, task)"
          @focus="handleClickTask(task)"
        >
          {{ task.title }}
        </div>
      </template>
    </div>
  </div>
</template>
