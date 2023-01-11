<script setup lang="ts">
import { NButton, NModal } from 'naive-ui'
import { ref } from 'vue'
import SearchBody from './SearchBody.vue'

const showSearch = ref(false)
</script>

<template>
  <div>
    <NButton @click="showSearch = !showSearch">
      CLick me
    </NButton>
    <NModal v-model:show="showSearch">
      <SearchBody />
    </NModal>
  </div>
</template>

<style scoped></style>
