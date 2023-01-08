<script setup lang="ts">
import TaskLeftListNTree from '@/views/task/TaskLeftListNTree.vue'
import TaskLeftListProject from '@/views/task/TaskLeftListProject.vue'
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
