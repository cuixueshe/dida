<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui';
import { computed } from 'vue';
import { isDark } from './composable/dark';

const naiveTheme = computed(() => isDark.value ? darkTheme : null);
</script>
<template>
  <NConfigProvider :theme="naiveTheme">
    <div>
      <RouterView></RouterView>
    </div>
  </NConfigProvider>
</template>

<style scoped>

</style>
