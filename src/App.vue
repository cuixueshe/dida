<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import BaseLayout from './layout/BaseLayout.vue'
import { naiveTheme } from '@/composable'
</script>

<template>
  <NConfigProvider :theme="naiveTheme">
    <BaseLayout>
      <RouterView />
    </BaseLayout>
  </NConfigProvider>
</template>

<style scoped></style>
