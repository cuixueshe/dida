<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { naiveTheme } from '@/composable'
</script>

<template>
  <NConfigProvider :theme="naiveTheme">
    <div>
      <RouterView />
    </div>
  </NConfigProvider>
</template>

<style scoped></style>
