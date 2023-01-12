<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NSelect } from 'naive-ui'
import { reactive } from 'vue'
import type { TaskListType } from '@/components/task/TaskLeftListSmartProject.vue'
import { useProjectMoreActions } from '@/composable/useProjectMoreActions'
import { SmartProjectNames } from '@/services/task'

const { showMoreIconIndex, showWitchPopover, openPopover, hideTaskItem, showTaskItem, canShowTaskList, whetherCanShow } = useProjectMoreActions()

const taskList = reactive<TaskListType[]>([
  {
    key: 1,
    icon: 'material-symbols:check-box',
    title: SmartProjectNames.Complete,
    option: whetherCanShow(1) ? 'visible' : 'hidden',
  },
  {
    key: 2,
    icon: 'mdi:close-box',
    title: SmartProjectNames.Failed,
    option: whetherCanShow(2) ? 'visible' : 'hidden',
  },
  {
    key: 3,
    icon: 'material-symbols:delete',
    title: SmartProjectNames.Trash,
    option: whetherCanShow(3) ? 'visible' : 'hidden',
  },
  {
    key: 4,
    icon: 'material-symbols:text-snippet-rounded',
    title: SmartProjectNames.Abstract,
    option: whetherCanShow(4) ? 'visible' : 'hidden',
  },
])

const options = [
  {
    label: '显示',
    value: 'visible',
  },
  {
    label: '隐藏',
    value: 'hidden',
  },
]

const handleChangeOption = (key: number, value: string) => {
  if (value === 'visible')
    showTaskItem(key)
  if (value === 'hidden')
    hideTaskItem(key)
}
</script>

<template>
  <ul p-8>
    <li
      v-for="item in taskList"
      :key="item.key"
      pl-4
      pr-2
      h-60px
      flex items-center
    >
      <div w-120px flex items-center>
        <Icon
          :icon="item.icon"
          width="20"
          class="color-[#9D9FA3]"
          dark="color-white-b"
        />
        <span>{{ item.title }}</span>
      </div>
      <div w-200px>
        <NSelect v-model:value="item.option" :options="options" @change="handleChangeOption(item.key, $event)" />
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
