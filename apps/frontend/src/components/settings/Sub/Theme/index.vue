<script setup lang="ts">
import Item from './Item.vue'
import { Themes } from '@/composables/settings'
</script>

<template>
  <div class="p-8">
    <div class="text-14px text-dark/70 dark:text-white/70 font-light">
      当前可选择的皮肤
    </div>
    <div class="flex justify-start items-center gap-18px mt-20px">
      <Item v-for="theme in Themes" :key="theme.name" :label="theme.label" :color="theme.color" :name="theme.name" />
    </div>
  </div>
</template>

<style scoped></style>
