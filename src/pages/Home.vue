<template>
  <div bg-gray-500>
    <h2>home</h2>
    <n-button type="warning" @click="toAboutView">to about</n-button>
    <div>
      <h3>store - counter</h3>
      count: {{ counterStore.count }}
      <n-button type="success" @click="counterStore.increment">increment</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCounterStore } from "../store/counter";
import { NButton } from 'naive-ui'

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

<style scoped>

</style>
