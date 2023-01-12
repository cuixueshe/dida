<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NPopover } from 'naive-ui'
import { reactive } from 'vue'
import {
  Status, useProjectSelectedStatusStore,
  useSmartProjectStore,
  useTaskStore,

} from '@/store'
import { useProjectMoreActions } from '@/composable/useProjectMoreActions'

const selected = 'bg-[#E7F5EE] dark:bg-[#233633]'

const taskStore = useTaskStore()
const projectSelectedStatusStore = useProjectSelectedStatusStore()
const { smartProjectList, checkVisible } = useSmartProjectStore()
const { showMoreIconIndex, showWitchPopover, openPopover, hideTaskItem, canShowTaskList } = useProjectMoreActions()

const handleTaskItemClick = (projectName: string, key: number) => {
  taskStore.changeCurrentActiveProject(projectName)
  projectSelectedStatusStore.changeSelectedKey([key])
}
</script>

<template>
  <ul>
    <li
      v-for="item in smartProjectList"
      v-show="checkVisible(item)"
      :key="item.key"
      li_common
      pl-4
      pr-2
      hover="bg-[#F3F3F5] dark:bg-[#2D2D30]"
      :class="
        projectSelectedStatusStore.selectedKey[0] === item.key ? selected : ''
      "
      @click="handleTaskItemClick(item.name, item.key)"
      @mouseenter="showMoreIconIndex = item.key"
      @mouseleave="showMoreIconIndex = -1"
    >
      <div flex>
        <Icon
          :icon="item.icon"
          width="20"
          class="color-[#9D9FA3]"
          dark="color-white-b"
        />
        <span class="ml-2">{{ item.name }}</span>
      </div>

      <NPopover
        trigger="click" style="padding: 5px 0 5px 0" :show="showWitchPopover === item.key" :show-arrow="false"
        placement="bottom-start" @clickoutside="showWitchPopover = -1"
      >
        <template #trigger>
          <Icon
            v-show="projectSelectedStatusStore.selectedKey[0] === item.key || showMoreIconIndex === item.key"
            icon="material-symbols:more-horiz"
            width="20"
            class="color-[#9D9FA3]"
            dark="color-white"
            @click="($event) => { $event.stopPropagation(); openPopover(item.key) }"
          />
        </template>
        <ul w-180px cursor-pointer>
          <li
            hover="bg-[#F3F3F5] dark:bg-[#2D2D30]" pl-4 text-14px h-20px lh-20px
            @click="hideTaskItem(item.key)"
          >
            隐藏
          </li>
        </ul>
      </NPopover>
    </li>
  </ul>
</template>

<style scoped></style>
