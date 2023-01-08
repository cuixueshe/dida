<script setup lang="ts">
import type { MessageReactive } from 'naive-ui'
import { NPopover, createDiscreteApi } from 'naive-ui'
import { h } from 'vue'
import type { Task } from '@/store'
import { SpecialProjectNames, TaskState, useTaskStore } from '@/store'
import { useTaskRightContextMenu } from '@/composable/taskRightContextMenu'

interface Props {
  task: Task
}

const props = defineProps<Props>()

const { message } = createDiscreteApi(
  ['message'],
)

let messageReactive: MessageReactive | null = null

const checkboxColors: Record<TaskState, string> = {
  [TaskState.ACTIVE]: 'bg-#ccc',
  [TaskState.COMPLETED]: 'bg-#007A78',
  [TaskState.GIVE_UP]: 'bg-#FF2200',
  [TaskState.REMOVED]: 'bg-#ccc',
}

const taskStore = useTaskStore()
const { showContextMenu } = useTaskRightContextMenu()

function handleRightClickTask(e: MouseEvent, task: Task) {
  taskStore.changeActiveTask(task)
  showContextMenu(e)
}

function handleClickTask(task: Task) {
  taskStore.changeActiveTask(task)
}

function handleInput(e: Event) {
  if (taskStore.currentActiveTask)
    taskStore.currentActiveTask.title = (e.target as HTMLElement).innerText
}

function handleCompleteTodo(e: Event) {
  if (props.task.state === TaskState.ACTIVE) {
    taskStore.completeTask(props.task)
    completeMessage(props.task)
  }
  else if (props.task.state === TaskState.COMPLETED) {
    taskStore.restoreTask(props.task)
  }
  else if (props.task.state === TaskState.REMOVED) {
    // eslint-disable-next-line no-console
    console.log('在垃圾桶里面的 task 不可以直接恢复')
  }
}

function completeMessage(task: Task) {
  messageReactive = message.info(
    () => h('p', null, [
      h('span', null, `${task.title} ${SpecialProjectNames.Complete}`),
      h('i', {
        style: 'color: teal;font-style:unset;cursor:pointer;margin-left: 20px',
        onClick: () => {
          taskStore.restoreTask(task)
          removeMessage()
        },
      }, '撤销'),
    ]),
    {
      icon: () => null,
      duration: 1000,
    },
  )
}

function removeMessage() {
  if (messageReactive) {
    messageReactive.destroy()
    messageReactive = null
  }
}
</script>

<template>
  <div class="flex flex-row gap-10px w-full items-center" @click.right="handleRightClickTask($event, task)">
    <i class="cursor-move text-gray-200 dark:text-#3B3B3B flex-shrink-0 i-mdi-format-align-justify text-sm" />
    <div class="flex justify-start items-center gap-5px h-40px py-5px flex-1">
      <template v-if="task.state === TaskState.REMOVED">
        <!-- 临时加的提示 后面要去掉 -->
        <div class="flex justify-start items-center gap-5px">
          <NPopover trigger="hover">
            <template #trigger>
              <button
                :class="[checkboxColors[task.state]]"
                class="w-5 h-5 rounded-1"
                @click="handleCompleteTodo"
              />
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
          :class="[checkboxColors[task.state]]"
          class="w-5 h-5 rounded-1"
          @click="handleCompleteTodo"
        />
        <div
          class="w-full cursor-pointer"
          contenteditable="true"
          @input="handleInput"
          @focus="handleClickTask(task)"
        >
          {{ task.title }}
        </div>
      </template>
    </div>
  </div>
</template>
