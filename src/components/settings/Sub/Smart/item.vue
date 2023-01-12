<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NSelect, selectProps } from 'naive-ui'
import type { SelectBaseOption, SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { Icon } from '@iconify/vue'
import { useSmartProjectStore } from '@/store'
import type { SmartProject, Status, TaskType } from '@/services/task/smartProject'
import { statusMapping } from '@/services/task/smartProject'
const { value, taskType } = defineProps<{
  value: SmartProject
  taskType: TaskType
}>()
const project = reactive(value)
const { toggleStatus } = useSmartProjectStore()
const options = (Object.keys(statusMapping || {}) as Status[]).map((v) => {
  return {
    label: statusMapping[v],
    value: v,
  }
}) as SelectBaseOption<Status, string>[]
const toggle = (value: Status) => {
  toggleStatus(taskType, value)
}
</script>

<template>
  <div flex items-center>
    <div flex gap-2 items-center w50>
      <Icon :icon="project.icon" width="20" />
      <div>{{ value.name }}</div>
    </div>
    <div><NSelect v-model:value="project.status" min-w-60 :options="options" @update:value="toggle" /></div>
  </div>
</template>
