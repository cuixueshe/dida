<script setup lang="ts">
import { toggleDark } from '@/composable/dark';

const goToGithub = () => {
    window.open("https://github.com/cuixiaorui/vue3-todo-list")
}
</script>
<template>
    <div class="flex items-center justify-start">
        <button class="mx-2 !outline-none" @click="toggleDark()">
            <div i="carbon-sun dark:carbon-moon" />
        </button>
        <button class="mx-2 !outline-none" @click="goToGithub()">
            <div i="mdi-github" />
        </button>
    </div>
</template>