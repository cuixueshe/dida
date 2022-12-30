<script setup lang="ts">
import { NPopover } from 'naive-ui'
import type { Task } from '@/store/task'
import { TaskState, useTaskStore } from '@/store/task'
import { useTaskRightContextMenu } from '@/composable/taskRightContextMenu'

interface Props {
  task: Task
}

const props = defineProps<Props>()

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
  taskStore.setCurrentActiveTaskTitle((e.target as HTMLInputElement).value)
}

function handleCompleteTodo(e: Event) {
  if (props.task.state === TaskState.ACTIVE)
    taskStore.completeTask(props.task)
  else if (props.task.state === TaskState.COMPLETED)
    taskStore.restoreTask(props.task)
  else if (props.task.state === TaskState.REMOVED)
    // eslint-disable-next-line no-console
    console.log('在垃圾桶里面的 task 不可以直接恢复')
}
</script>

<template>
  <div @click.right="handleRightClickTask($event, task)">
    <div class="flex justify-start items-center gap-5px">
      <template v-if="task.state === TaskState.REMOVED">
        <!-- 临时加的提示 后面要去掉 -->
        <div class="flex justify-start items-center gap-5px">
          <div>
            <NPopover trigger="hover">
              <template #trigger>
                <button
                  :class="[
                    checkboxColors[task.state],
                  ]" class="w-5 h-5 rounded-1" @click="handleCompleteTodo"
                />
              </template>
              <div>在垃圾桶里面的 Task 是不可以直接被恢复的哦</div>
            </NPopover>
          </div>
          <div class="w-full" @click="handleClickTask(task)">
            {{ task.title }}
          </div>
        </div>
      </template>
      <template v-else>
        <button
          :class="[
            checkboxColors[task.state],
          ]"
          class="w-5 h-5 rounded-1"
          @click="handleCompleteTodo"
        />
        <input
          type="text"
          class="w-full cursor-pointer"
          :value="task.title"
          @input="handleInput"
          @focus="handleClickTask(task)"
        >
      </template>
    </div>
  </div>
</template>
