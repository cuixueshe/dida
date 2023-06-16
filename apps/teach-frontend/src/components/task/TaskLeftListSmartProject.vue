<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NPopover } from 'naive-ui'
import { ref } from 'vue'
import { useTaskLeftListStore } from './taskLeftList'
import type { SmartProjectName } from '@/store'
import {
  useSettingsStore,
  useSmartProjects,
} from '@/store'

export interface TaskListType {
  key: number
  icon: string
  title: `${SmartProjectName}`
  option?: string
}

function useProjectMoreActions() {
  const showMoreIconIndex = ref<number>(-1)
  const showWitchPopover = ref<number>(-1)

  const openPopover = (key: number) => {
    showWitchPopover.value = key
  }

  return {
    showMoreIconIndex,
    showWitchPopover,
    openPopover,
  }
}

const taskLeftListStore = useTaskLeftListStore()
const settingsStore = useSettingsStore()
const selected = 'bg-[#E7F5EE] dark:bg-[#233633]'

const smartProjects = useSmartProjects()
const { showMoreIconIndex, showWitchPopover, openPopover }
  = useProjectMoreActions()

const handleTaskItemClick = (projectName: string) => {
  smartProjects.selectProject(projectName as SmartProjectName)
  taskLeftListStore.selectedKey = projectName
}
</script>

<template>
  <ul>
    <li
      v-for="(item, key) in settingsStore.visibleSmartProjects"
      :key="key"
      li_common
      pl-4
      pr-2
      hover="bg-[#F3F3F5] dark:bg-[#2D2D30]"
      :class="taskLeftListStore.selectedKey === item.title ? selected : ''"
      @click="handleTaskItemClick(item.title)"
      @mouseenter="showMoreIconIndex = key"
      @mouseleave="showMoreIconIndex = -1"
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

      <NPopover
        trigger="click"
        style="padding: 5px 0 5px 0"
        :show="showWitchPopover === key"
        :show-arrow="false"
        placement="bottom-start"
        @clickoutside="showWitchPopover = -1"
      >
        <template #trigger>
          <Icon
            v-show="showMoreIconIndex === key"
            icon="material-symbols:more-horiz"
            width="20"
            class="color-[#9D9FA3]"
            dark="color-white"
            @click="
              ($event) => {
                $event.stopPropagation();
                openPopover(key);
              }
            "
          />
        </template>
        <ul w-180px cursor-pointer>
          <li
            hover="bg-[#F3F3F5] dark:bg-[#2D2D30]"
            pl-4
            text-14px
            h-20px
            lh-20px
            @click="settingsStore.setHideSmartProject(item)"
          >
            隐藏
          </li>
        </ul>
      </NPopover>
    </li>
  </ul>
</template>

<style scoped></style>
