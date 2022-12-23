<template>
  <div>
    <h1>
      {{ taskStore.currentActiveTask?.title }}
    </h1>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useTaskStore } from '../../store'

const taskStore = useTaskStore()

</script>

<style scoped>

</style>