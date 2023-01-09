<script setup lang="ts">
import SettingsSidebar from './SettingsSidebar.vue'
</script>

<template>
  <div class="flex justify-between items-center min-h-400px rounded-5px overflow-hidden">
    <div class="w-1/5 dark:bg-#1f1f1f bg-white min-h-400px">
      <SettingsSidebar />
    </div>
    <div class="w-4/5 dark:bg-#2e2e2e bg-white min-h-400px">
      <router-view />
    </div>
  </div>
</template>
