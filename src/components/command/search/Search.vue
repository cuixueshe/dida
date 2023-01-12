<script setup lang="ts">
import { NEmpty, NScrollbar } from 'naive-ui'
import SearchItem from './SearchItem.vue'
import { useSearchStore } from '@/store'

const searchStore = useSearchStore()
const handleSearch = async (input: string) => {
  searchStore.handleSearch(input)
  return Promise.resolve()
}

defineExpose({
  handleSearch,
  clear() {
    searchStore.clear()
  },
})
</script>

<template>
  <div class="flex flex-col gap-15px max-h-400px overflow-auto">
    <NScrollbar style="max-height: 400px" trigger="none">
      <SearchItem v-for="item in searchStore.searchTasks" :key="item.item.id" v-bind="item.item" />
    </NScrollbar>
    <NEmpty v-show="!searchStore.searchTasks.length" description="没有找到哦" />
  </div>
</template>

<style scoped></style>
