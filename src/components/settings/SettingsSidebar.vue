<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sidebars } from '@/services/settings'

const options: MenuOption[] = sidebars.map(sidebar => ({
  label: () => h(RouterLink, { to: `/settings${sidebar.path}` }, { default: () => sidebar.title }),
  key: sidebar.path.slice(1),
}))

const route = useRoute()

// 根据当前的 path 的到最后一位，由于 path 在 options 中是 key，因此得到当前选中的 menu
const getCurrentMenu = () => {
  const path = route.path
  const pathArr = path.split('/')
  return pathArr[pathArr.length - 1]
}
</script>

<template>
  <NMenu :options="options" :default-value="getCurrentMenu()" />
</template>

<style scoped></style>
