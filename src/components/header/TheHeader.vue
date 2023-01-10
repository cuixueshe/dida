<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/store'

const router = useRouter()

const themeStore = useThemeStore()

const goTo = {
  home: () => router.push({
    path: '/',
  }),
  settings: () => router.push({
    name: 'Settings',
  }),
  github: () => window.open('https://github.com/cuixiaorui/vue3-dida'),
} as const
</script>

<template>
  <div class="w-full base-color h-40px px-1% flex justify-between items-center text-16px">
    <div class="cursor-pointer" aria-label="Go Home" @click="goTo.home()">
      Vue3 DiDa Todo List
    </div>
    <div class="flex items-center justify-start">
      <button class="mx-2 !outline-none" @click="goTo.settings()">
        <div i="carbon-settings" />
      </button>
      <button class="mx-2 !outline-none" @click="themeStore.toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
      <button class="mx-2 !outline-none" @click="goTo.github()">
        <div i="mdi-github" />
      </button>
    </div>
  </div>
</template>
