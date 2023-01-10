<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { naiveTheme } from '@/composable'
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<template>
  <NConfigProvider :theme="naiveTheme">
    <div class="flex ">
      <Navbar />
      <main class="flex-auto">
        <RouterView />
      </main>
    </div>
  </NConfigProvider>
</template>

<style scoped></style>
