<script setup lang="ts">
import { NScrollbar } from 'naive-ui'
import SearchItem from './SearchItem.vue'
</script>

<template>
  <div class="flex flex-col gap-15px max-h-400px overflow-auto">
    <NScrollbar style="max-height: 400px" trigger="none">
      <SearchItem v-for="item in 80" :key="item" title="aaa" desc="bbb" from="sss" :done="true" />
    </NScrollbar>
  </div>
</template>

<style scoped></style>
