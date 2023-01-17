<script setup lang="ts">
import { NDropdown, NPopover } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Command from '@/components/command/Command.vue'
import { useIsMac } from '@/composable'

const commandRef = ref<InstanceType<typeof Command>>()

const isMac = useIsMac()

// Command + K Or Command + / will show command in MacOS
// Ctrl + K Or Ctrl + / in Windows
window.addEventListener('keydown', (e: KeyboardEvent) => {
  if ((e.key === 'k' || e.key === 'л') && (isMac.value ? e.metaKey : e.ctrlKey)) {
    e.preventDefault()
    commandRef.value?.show()
  }
  if ((e.key === '/' || e.key === ',') && (isMac.value ? e.metaKey : e.ctrlKey)) {
    e.preventDefault()
    commandRef.value?.show()
  }
})
const router = useRouter()

const settingOptions = [
  {
    label: '设置',
    key: 'settings',
    props: {
      onClick: () => {
        router.push({
          name: 'Settings',
        })
      },
    },
  },
]
</script>

<template>
  <div class="w-[48px] border-r border-blue border-solid py-2 dark:bg-black">
    <NDropdown
      placement="right-end"
      :options="settingOptions"
    >
      <!-- avatar -->
      <div class="w-[32px] h-[32px] rounded-sm bg-blue mx-auto">
        <img src="" alt="">
      </div>
    </NDropdown>
    <!-- page router -->
    <div
      class="text-gray-4 flex flex-col justify-center items-center text-xl mt-10 gap-6 font-bold"
    >
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
            @click="commandRef?.show()"
          />
        </template>
        <span>搜索面板</span>
      </NPopover>
    </div>
    <Command ref="commandRef" />
  </div>
</template>
