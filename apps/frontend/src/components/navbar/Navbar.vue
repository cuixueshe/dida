<script setup lang="ts">
import { NDropdown, NPopover } from 'naive-ui'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { openCommandModal } from '../command/commandModal'
import Command from '@/components/command/CommandModal.vue'
import { useGoto } from '@/composables'

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
      openCommandModal()
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
      <!-- <template v-for="(iconOption, i) in activityIconOptions" :key="i">
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
      </template> -->
      <NPopover placement="right">
        <template #trigger>
          <div
            class="hover:text-gray-6 dark:hover:text-gray-2"
            i="carbon-checkbox-checked-filled"
          />
        </template>
        <span>任务</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div
            class="hover:text-gray-6 dark:hover:text-gray-2"
            i="carbon-calendar-heat-map"
          />
        </template>
        <span>日历</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div
            class="hover:text-gray-6 dark:hover:text-gray-2"
            i="carbon-task-complete"
          />
        </template>
        <span>打卡</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div
            class="hover:text-gray-6 dark:hover:text-gray-2 cursor-pointer"
            i="carbon-search"
            @click="() => openCommandModal()"
          />
        </template>
        <span>搜索面板</span>
      </NPopover>
    </div>
    <Command />
  </div>
</template>
