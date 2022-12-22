<template>
  <div>
    <button aria-label="decrement" @click="count--">-</button>
    <span data-cy="counter">{{ count }}</span>
    <button aria-label="increment" @click="count++">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["initial"]);

const emit = defineEmits(["change"]);

const count = ref(props.initial || 0);
</script>

<style scoped></style>
