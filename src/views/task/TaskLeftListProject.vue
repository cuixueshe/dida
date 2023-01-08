<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { reactive } from 'vue'
import {
  SpecialProjectNames,
  useTaskStatusStore,
  useTaskStore,
} from '@/store'

interface TaskListType {
  key: number
  icon: string
  title: `${SpecialProjectNames}`
}

const taskList = reactive<TaskListType[]>([
  {
    key: 1,
    icon: 'material-symbols:check-box',
    title: SpecialProjectNames.Complete,
  },
  {
    key: 2,
    icon: 'mdi:close-box',
    title: SpecialProjectNames.Failed,
  },
  {
    key: 3,
    icon: 'material-symbols:delete',
    title: SpecialProjectNames.Trash,
  },
  {
    key: 4,
    icon: 'material-symbols:text-snippet-rounded',
    title: SpecialProjectNames.Abstract,
  },
])
const selected = 'bg-[#E7F5EE] dark:bg-[#233633]'

const taskStore = useTaskStore()
const taskStatusStore = useTaskStatusStore()

const changeSelectedKeyAndActiveProject = (
  projectName: string,
  key: number,
) => {
  taskStore.changeCurrentActiveProject(projectName)
  taskStatusStore.changeSelectedKey([key])
}
</script>

<template>
  <ul>
    <li
      v-for="item in taskList"
      :key="item.key"
      li_common
      pl-4
      pr-2
      hover="bg-[#F3F3F5] dark:bg-[#2D2D30]"
      :class="
        taskStatusStore.selectedKey[0] === item.key
          ? selected
          : ''
      "
      @click="
        changeSelectedKeyAndActiveProject(
          item.title,
          item.key,
        )
      "
    >
      <div flex>
        <Icon
          :icon="item.icon"
          width="20"
          class="color-[#9D9FA3]"
          dark="color-white-b"
        />
        <span class="ml-2">{{ item.title }}</span>
      </div>

      <Icon
        v-show="taskStatusStore.selectedKey[0] === item.key"
        icon="material-symbols:more-horiz"
        width="20"
        class="color-[#9D9FA3]"
        dark="color-white"
      />
    </li>
  </ul>
</template>

<style scoped></style>
