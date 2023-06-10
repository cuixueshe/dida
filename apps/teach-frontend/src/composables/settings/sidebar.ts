enum Sidebars {
  Theme = '主题',
  Smart = '智能清单',
}

interface SidebarItem {
  title: Sidebars
  name: string
  path: string
}

// 如何添加一个新的 sidebar？请详细阅读 https://github.com/cuixueshe/dida/pull/52
export const sidebars: SidebarItem[] = [
  {
    title: Sidebars.Theme,
    name: 'Theme',
    path: '/theme',
  },
  {
    title: Sidebars.Smart,
    name: 'Smart',
    path: '/smart',
  },
]
