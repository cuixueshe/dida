<script setup lang="ts">
import { ref } from 'vue'
import ModalDialog from '@/components/dialog/ModalDialog.vue'

const isOpenSearch = ref(true)
</script>

<template>
  <ModalDialog v-model="isOpenSearch" />
</template>

<style scoped></style>
