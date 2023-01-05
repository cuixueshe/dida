<script setup lang="ts">
import { ref } from 'vue'

import TaskInventory from './TaskInventory.vue'
import TaskTag from './TaskTag.vue'
import TaskOther from './TaskOther.vue'

const selectedKey = ref([101])
const listDefaultSelectedKey = ref([100])

const getCurrentInventory = (key: number[]) => {
  selectedKey.value = key
}
const getCurrentTag = (key: number[]) => {
  selectedKey.value = key
}
const getOtherKey = (key: number[]) => {
  selectedKey.value = key
}
</script>

<template>
  <div>
    <TaskInventory
      :selected-key="selectedKey" :list-default-selected-key="listDefaultSelectedKey"
      @get-current-inventory="getCurrentInventory"
    />
    <TaskTag
      :selected-key="selectedKey" :list-default-selected-key="listDefaultSelectedKey"
      @get-current-tag="getCurrentTag"
    />
    <TaskOther
      :selected-key="selectedKey"
      @get-other-key="getOtherKey"
    />
  </div>
</template>

<style scoped>

</style>
