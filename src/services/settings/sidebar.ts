enum Sidebars {
  Theme = '主题',
  Smart = '智能清单',
}

interface SidebarItem {
  id: number
  title: Sidebars
  name: string
  path: string
}

export const sidebars: SidebarItem[] = [
  {
    id: 0,
    title: Sidebars.Smart,
    name: 'Smart',
    path: '/smart',
  },
  {
    id: 1,
    title: Sidebars.Theme,
    name: 'Theme',
    path: '/theme',
  },
]
