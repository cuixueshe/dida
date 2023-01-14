<script setup lang="ts">
import TaskLeftListProject from '@/components/task/TaskLeftListProject.vue'
import TaskLeftListSmartProject from '@/components/task/TaskLeftListSmartProject.vue'
</script>

<template>
  <div>
    <div>
      <TaskLeftListProject />
    </div>
    <div class="mt-2px">
      <TaskLeftListSmartProject />
    </div>
  </div>
</template>

<style scoped></style>
