<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NButton } from 'naive-ui'
import { useCounterStore } from '../store/counter'

const router = useRouter()
const toAboutView = () => {
  router.push({
    name: 'About',
  })
}

// store
const counterStore = useCounterStore()
</script>

<template>
  <div>
    <h2>home</h2>
    <NButton type="warning" @click="toAboutView">
      to about
    </NButton>
    <div>
      <h3>store - counter</h3>
      count: {{ counterStore.count }}
      <NButton type="success" @click="counterStore.increment">
        increment
      </NButton>
    </div>
  </div>
</template>

<style scoped>

</style>
