<script setup lang="ts">
import SettingsBody from '@/components/settings/SettingsBody.vue'
import SettingsHeader from '@/components/settings/SettingsHeader.vue'
</script>

<template>
  <div class="base-color h-[calc(100vh-40px)]">
    <div class="w-1000px my-0 mx-auto">
      <SettingsHeader />
      <SettingsBody class="mt-20px" />
    </div>
  </div>
</template>

<style scoped></style>
