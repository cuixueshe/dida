<script setup lang="ts">
import { NCheckbox, NEllipsis } from 'naive-ui'

const props = defineProps<{
  title: string
  desc: string
  done: boolean
  from: string
}>()
</script>

<template>
  <div class="w-full border-b-1px p-3 border-gray-500/8" :class="{ 'text-gray-300 dark:text-gray-700': props.done }">
    <div class="w-full flex justify-start items-center">
      <NCheckbox :checked="props.done" disabled size="large" />
      <NEllipsis style="width: 660px" :tooltip="false" class="text-18px ml-10px text-ellipsis overflow-hidden" :class="{ 'line-through': props.done }">
        {{ title }}
      </NEllipsis>
      <div class="w-80px flex justify-center items-center text-gray-500">
        {{ from }}
      </div>
    </div>
    <NEllipsis style="width: 660px" :tooltip="false" class="w-full mt-5px ml-30px pr-80px">
      {{ desc }}
    </NEllipsis>
    <span />
  </div>
</template>

<style scoped></style>
