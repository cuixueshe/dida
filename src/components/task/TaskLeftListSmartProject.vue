<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { reactive } from 'vue'
import { useProjectMoreActions } from '@/composable/useProjectMoreActions';
import { NPopover } from "naive-ui"
import {
  SmartProjectNames,
  useProjectSelectedStatusStore,
  useTaskStore,
} from '@/store'

interface TaskListType {
  key: number
  icon: string
  title: `${SmartProjectNames}`
}

const taskList = reactive<TaskListType[]>([
  {
    key: 1,
    icon: 'material-symbols:check-box',
    title: SmartProjectNames.Complete,
  },
  {
    key: 2,
    icon: 'mdi:close-box',
    title: SmartProjectNames.Failed,
  },
  {
    key: 3,
    icon: 'material-symbols:delete',
    title: SmartProjectNames.Trash,
  },
  {
    key: 4,
    icon: 'material-symbols:text-snippet-rounded',
    title: SmartProjectNames.Abstract,
  },
])

const selected = 'bg-[#E7F5EE] dark:bg-[#233633]'

const taskStore = useTaskStore()
const projectSelectedStatusStore = useProjectSelectedStatusStore()
const {showMoreIconIndex, showWitchPopover, openPopover, hideTaskItem, shouldShowTaskList} = useProjectMoreActions()

const handleTaskItemClick = (projectName: string, key: number) => {
  taskStore.changeCurrentActiveProject(projectName)
  projectSelectedStatusStore.changeSelectedKey([key])
}
</script>

<template>
  <ul>
    <li
      v-for="item in taskList"
      :key="item.key"
      v-show="shouldShowTaskList.includes(item.title)"
      li_common
      pl-4
      pr-2
      hover="bg-[#F3F3F5] dark:bg-[#2D2D30]"
      :class="
        projectSelectedStatusStore.selectedKey[0] === item.key ? selected : ''
      "
      @click="handleTaskItemClick(item.title, item.key)"
      @mouseenter="showMoreIconIndex = item.title"
      @mouseleave="showMoreIconIndex = ''"
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

      <NPopover trigger="click" style="padding: 5px 0 5px 0" @clickoutside="showWitchPopover = ''" :show="showWitchPopover === item.title"
           :show-arrow="false" placement="bottom-start">
            <template #trigger>
              <Icon
                v-show="projectSelectedStatusStore.selectedKey[0] === item.key || showMoreIconIndex === item.title"
                icon="material-symbols:more-horiz"
                width="20"
                class="color-[#9D9FA3]"
                dark="color-white"
                @click="($event) => {$event.stopPropagation(); openPopover(item.title)}"
              />
            </template>
            <ul w-180px cursor-pointer>
              <li hover="bg-[#F3F3F5] dark:bg-[#2D2D30]" pl-4 text-14px h-20px lh-20px
              @click="hideTaskItem(item.title)">隐藏</li>
            </ul>
      </NPopover>
    </li>
  </ul>
</template>

<style scoped></style>
