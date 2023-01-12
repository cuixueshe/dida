<script setup lang="ts">
import Item from './item.vue'
import { useSmartProjectStore } from '@/store'
const { smartProjectList } = useSmartProjectStore()
</script>

<template>
  <div p-10>
    <Item v-for="(t, k) in smartProjectList" :key="t.key" mb-4 :task-type="k" :value="t" />
  </div>
</template>

<style scoped></style>
