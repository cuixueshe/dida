<script setup lang="ts">
import TaskLeftListNTree from '@/components/task/TaskLeftListNTree.vue'
import TaskLeftListProject from '@/components/task/TaskLeftListProject.vue'
</script>

<template>
  <div>
    <div>
      <TaskLeftListNTree />
    </div>
    <div class="mt-2px">
      <TaskLeftListProject />
    </div>
  </div>
</template>

<style scoped></style>
