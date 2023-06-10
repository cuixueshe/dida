<script setup lang="ts">
import { NEmpty, NInput, NSkeleton } from 'naive-ui'
import { inputStateMachine, isSearchCommand, search } from './search'
import CommandSearchCommands from './CommandSearchCommands.vue'
import CommandSearchTasks from './CommandSearchTasks.vue'
</script>

<template>
  <div class="base-color w-200 h-120 rounded p-sm">
    <NInput
      v-model:value="search"
      placeholder="通过关键字搜索，或添加 '>' 前缀开启命令模式"
      clearable
    />
    <div class="mt-6">
      <NEmpty v-show="inputStateMachine.state.value === 'waitingForInput'" description="搜索任务，标签或查看命令。">
        <template #icon />
      </NEmpty>
      <div v-show="inputStateMachine.state.value === 'loading'">
        <NSkeleton text :repeat="2" />
        <NSkeleton text style="width: 60%" />
      </div>
      <div v-show="inputStateMachine.state.value === 'loadCompleted'">
        <component :is="isSearchCommand ? CommandSearchCommands : CommandSearchTasks" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
