import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import Settings from '@/pages/Settings.vue'
import { sidebars } from '@/services/settings'

const SETTINGS_PATH = 'settings'

const subComponents = import.meta.glob(['/src/components/settings/Sub/*.vue'])

const subRoutes: RouteRecordRaw[] = sidebars.map(sidebar => ({
  path: `/settings${sidebar.path}`,
  name: `Settings${sidebar.name}`,
  component: subComponents[`/src/components/settings/Sub/${sidebar.name}.vue`] as () => Promise<Component>,
  meta: {
    title: sidebar.title,
  },
}))

export default {
  path: `/${SETTINGS_PATH}`,
  component: Settings,
  name: 'Settings',
  meta: { title: '设置' },
  children: subRoutes,
  redirect: subRoutes[0].path,
} as RouteRecordRaw
