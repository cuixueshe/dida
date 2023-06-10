<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sidebars } from '@/composables/settings'

const options: MenuOption[] = sidebars.map(sidebar => ({
  label: () => h(RouterLink, { to: `/settings${sidebar.path}` }, { default: () => sidebar.title }),
  key: sidebar.path.slice(1),
}))

const route = useRoute()

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
