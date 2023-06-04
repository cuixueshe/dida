<script setup lang="ts">
import { NDropdown, NPopover } from 'naive-ui'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { useCommand } from '../command/command'
import Command from '@/components/command/Command.vue'
import { useGoto } from '@/composables'

const { showCommand } = useCommand()
const { gotoSettings } = useGoto()

const settingOptions: DropdownMixedOption[] = [
  {
    label: '设置',
    key: 'settings',
    props: {
      onClick: () => {
        gotoSettings()
      },
    },
  },
]

interface ActivityIconOption {
  label: string
  icon: string
  onClick?: () => void
}

const activityIconOptions: ActivityIconOption[] = [
  {
    label: '任务',
    icon: 'carbon-checkbox-checked-filled',
  },
  {
    label: '日历',
    icon: 'carbon-calendar-heat-map',
  },
  {
    label: '打卡',
    icon: 'carbon-task-complete',
  },
  {
    label: '搜索面板',
    icon: 'carbon-search',
    onClick() {
      showCommand()
    },
  },
]
</script>

<template>
  <div class="w-[48px] border-r border-blue border-solid py-2 dark:bg-black">
    <NDropdown placement="right-end" :options="settingOptions">
      <!-- avatar -->
      <div class="w-[32px] h-[32px] rounded-sm bg-blue mx-auto">
        <img src="" alt="">
      </div>
    </NDropdown>
    <!-- page router -->
    <div
      class="text-gray-4 flex flex-col justify-center items-center text-xl mt-10 gap-6 font-bold"
    >
      <template v-for="(iconOption, i) in activityIconOptions" :key="i">
        <NPopover placement="right">
          <template #trigger>
            <div
              class="hover:text-gray-6 dark:hover:text-gray-2"
              :i="iconOption.icon"
              @click="() => iconOption.onClick && iconOption.onClick()"
            />
          </template>
          <span>{{ iconOption.label }}</span>
        </NPopover>
      </template>
    </div>
    <Command />
  </div>
</template>
