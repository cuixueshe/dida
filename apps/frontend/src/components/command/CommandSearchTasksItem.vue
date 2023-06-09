<script setup lang="ts">
import { NCheckbox, NEllipsis } from 'naive-ui'
import { closeCommandModal } from './commandModal'
import type { TasksSelector } from '@/store'
import { useTasksSelectorStore } from '@/store'

const props = defineProps<{
  title: string
  desc: string
  done: boolean
  from: TasksSelector
  id: string
}>()

const tasksSelectorStore = useTasksSelectorStore()

const goTo = async () => {
  if (props.from)
    await tasksSelectorStore.setCurrentSelector(props.from)
    // TODO 还应该跳转到对应的 task 上

  closeCommandModal()
}
</script>

<template>
  <div
    class="w-full border-b-1px p-3 border-gray-500/8 hover:bg-cyan/2"
    :class="{ 'text-gray-300 dark:text-gray-700': props.done }"
  >
    <!-- TODO 添加高亮 -->
    <div
      class="w-full flex justify-start items-center cursor-pointer"
      @click="goTo"
    >
      <NCheckbox :checked="props.done" disabled size="large" />
      <NEllipsis
        style="width: 660px"
        :tooltip="false"
        class="text-18px ml-10px text-ellipsis overflow-hidden"
        :class="{ 'line-through': props.done }"
      >
        {{ title }}
      </NEllipsis>
      <div class="w-80px flex justify-center items-center text-gray-500">
        {{ from?.name }}
      </div>
    </div>
    <NEllipsis
      style="width: 660px"
      :tooltip="false"
      class="w-full mt-5px ml-30px pr-80px"
    >
      {{ desc }}
    </NEllipsis>
  </div>
</template>

<style scoped></style>
