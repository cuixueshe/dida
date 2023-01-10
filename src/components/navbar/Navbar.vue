<script setup lang="ts">
import { NDropdown, NIcon, NPopover } from 'naive-ui'
import { h } from 'vue'
</script>

<template>
  <div class="w-[48px] border-r border-blue border-solid py-2 dark:bg-black">
    <NDropdown
      placement="right-end"
      :options="[{
        label: '设置',
        key: 'settings',
      }]"
    >
      <!-- avatar -->
      <div class="w-[32px] h-[32px] rounded-sm bg-blue mx-auto">
        <img src="" alt="">
      </div>
    </NDropdown>
    <!-- page router -->
    <div class="text-gray-4 flex flex-col justify-center items-center text-xl mt-10 gap-6 font-bold">
      <NPopover placement="right">
        <template #trigger>
          <div class="hover:text-gray-6 dark:hover:text-gray-2" i="carbon-checkbox-checked-filled" />
        </template>
        <span>任务</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div class="hover:text-gray-6 dark:hover:text-gray-2" i="carbon-calendar-heat-map" />
        </template>
        <span>日历</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div class="hover:text-gray-6 dark:hover:text-gray-2" i="carbon-task-complete" />
        </template>
        <span>打卡</span>
      </NPopover>
    </div>
  </div>
</template>
