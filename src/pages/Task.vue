<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
import TaskList from '@/components/task/TaskList.vue'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TheHeader from '@/components/header/TheHeader.vue'
</script>

<template>
  <div
    class="
      w-full  bg-gray-100 text-black dark:bg-#18181c dark:text-white
      h-40px px-1% flex justify-between items-center
      text-16px
    "
  >
    <div>Vue3 Todo App Real-World</div>
    <TheHeader />
  </div>
  <NLayout has-sider class="!h-[calc(100vh-40px)]">
    <NLayoutSider
      collapse-mode="transform" :collapsed-width="0" :width="240" show-trigger="bar"
      content-style="padding: 24px;" bordered
    >
      <TaskLeftListView />
    </NLayoutSider>
    <NLayoutContent>
      <NLayoutContent content-style="padding: 24px">
        <div class="flex w-full h-full">
          <TaskList class="flex-1 w-0" />
          <TaskEditor class="flex-1 w-0" />
        </div>
      </NLayoutContent>
    </NLayoutContent>
  </NLayout>
</template>
