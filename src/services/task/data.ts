// 暂时模拟后端返回的数据格式
export const fetchData = {
  projects: [
    {
      name: '快捷',
      tasks: [
        {
          title: '吃饭',
          content: '## 吃饭 \n 吃什么好呢',
          state: 1,
          id: crypto.randomUUID(),
        },
        {
          title: '睡觉',
          content: '## 睡觉 \n 早睡早起 身体好',
          state: 1,
          id: crypto.randomUUID(),
        },
        {
          title: '写代码',
          content: '## 写代码 \n 日常写码2个点',
          state: 2,
          id: crypto.randomUUID(),
        },
      ],
    },
    {
      name: '集草器',
      tasks: [
        {
          title: '哈哈哈',
          content: 'hahaha',
          state: 1,
          id: crypto.randomUUID(),
        },
        {
          title: '嘿嘿嘿',
          content: 'heiheihei',
          state: 1,
          id: crypto.randomUUID(),
        },
      ],
    },
  ],
  trash: {
    name: '垃圾桶',
    tasks: [
      {
        title: '我是被删除的 task',
        content: '',
        state: 4,
        id: crypto.randomUUID(),
      },
    ],
  },
}
