<script setup lang="ts">
import { NEmpty, NScrollbar } from 'naive-ui'
import SearchItem from './CommandSearchTasksItem.vue'
import { useSearchTasks } from './searchTasks'

const { filteredTasks } = useSearchTasks()
</script>

<template>
  <div class="flex flex-col gap-15px max-h-400px overflow-auto">
    <NScrollbar style="max-height: 400px" trigger="none">
      <SearchItem v-for="item in filteredTasks" :key="item.item.id" v-bind="item.item" />
    </NScrollbar>
    <NEmpty v-show="!filteredTasks.length" description="没有找到哦" />
  </div>
</template>

<style scoped></style>
