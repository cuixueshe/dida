<script setup lang="ts">
import { toggleDark } from '@/composable/dark';

</script>
<template>
    <div class="flex items-center justify-start">
        <button class="icon-btn mx-2 !outline-none" @click="toggleDark()">
            <div i="carbon-sun dark:carbon-moon" />
        </button>
    </div>
</template>