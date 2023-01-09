<script setup lang="ts">
import { useRouter } from 'vue-router'
import { toggleDark } from '@/composable'

const goToGithub = () => {
  window.open('https://github.com/cuixiaorui/vue3-dida')
}

const router = useRouter()

const goToSettings = () => {
  router.push({
    name: 'Settings',
  })
}
</script>

<template>
  <div class="w-full base-color h-40px px-1% flex justify-between items-center text-16px">
    <div>Vue3 DiDa Todo List</div>
    <div class="flex items-center justify-start">
      <button class="mx-2 !outline-none" @click="goToSettings()">
        <div i="carbon-settings" />
      </button>
      <button class="mx-2 !outline-none" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
      <button class="mx-2 !outline-none" @click="goToGithub()">
        <div i="mdi-github" />
      </button>
    </div>
  </div>
</template>
