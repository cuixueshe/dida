<script setup lang="ts">
import TheHeader from '@/components/header/TheHeader.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import Search from '@/components/search/Search.vue'
</script>

<template>
  <div>
    <TheHeader />
    <div class="flex">
      <Navbar />
      <div class="grow">
        <slot />
      </div>
    </div>
    <Search />
  </div>
</template>
