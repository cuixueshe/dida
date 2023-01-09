<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { sidebars } from '@/services/settings'

const options: MenuOption[] = sidebars.map(sidebar => ({
  label: () => h(RouterLink, { to: `/settings${sidebar.path}` }, { default: () => sidebar.title }),
  key: sidebar.id,
}))
</script>

<template>
  <NMenu :options="options" />
</template>

<style scoped></style>
