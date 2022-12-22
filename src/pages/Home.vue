<template>
  <div>
    <h2>home</h2>
    <button @click="toAboutView">to about</button>
    <div>
      <h3>store - counter</h3>
      count: {{ counterStore.count }}
      <button @click="counterStore.increment">increment</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCounterStore } from "../store/counter";

const router = useRouter();
const toAboutView = () => {
  router.push({
    name: "About",
  });
};

// store
const counterStore = useCounterStore();
console.log(counterStore);
</script>

<style scoped></style>
