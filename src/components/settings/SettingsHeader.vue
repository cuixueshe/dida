<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push({
    path: '/',
  })
}
</script>

<template>
  <NSpace justify="space-between" item-style="center">
    <h1 class="text-3xl">
      设置
    </h1>
    <button
      class="
            w-100px h-40px rounded-md bg-blue-500 text-white text-16px
            hover:bg-blue-400 active:bg-blue-700 transition-colors
          "
      @click="goToHome()"
    >
      完成
    </button>
  </NSpace>
</template>
