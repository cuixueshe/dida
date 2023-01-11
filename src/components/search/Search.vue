<script setup lang="ts">
import { NButton, NModal } from 'naive-ui'
import { ref } from 'vue'

const showSearch = ref(false)
</script>

<template>
  <div>
    <NButton @click="showSearch = !showSearch">
      CLick me
    </NButton>
    <NModal v-model:show="showSearch">
      <div class="base-color w-200px h-200px">
        hello world
      </div>
    </NModal>
  </div>
</template>

<style scoped></style>
