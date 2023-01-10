<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import BaseLayout from './layout/BaseLayout.vue'
import { useThemeStore } from '@/store'
import Navbar from '@/components/navbar/Navbar.vue'

const themeStore = useThemeStore()
</script>

<template>
  <NConfigProvider :theme="themeStore.naiveTheme">
    <BaseLayout>
      <Navbar />
      <RouterView />
    </BaseLayout>
  </NConfigProvider>
</template>

<style scoped></style>
