<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { useRoute } from 'vue-router'
import BaseLayout from './layout/BaseLayout.vue'
import { useCommand } from '@/composables/command'
import { useThemeStore } from '@/store'

const route = useRoute()
const themeStore = useThemeStore()
const { initCommands } = useCommand()
initCommands()
</script>

<template>
  <NConfigProvider :theme="themeStore.naiveTheme">
    <BaseLayout v-if="route.meta.layout !== false">
      <RouterView />
    </BaseLayout>
    <RouterView v-else />
  </NConfigProvider>
</template>

<style scoped></style>
