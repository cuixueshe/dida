import { vi } from 'vitest'
export { TaskStatus } from '../tasks'

// 这里还是缺了一个类型
// TODO 这里要等后端处理好返回的类型之后在解决
const tasks = [
  {
    _id: '0',
    title: '吃饭',
    content: '今天吃什么',
    status: 'active',
    projectId: '1',
    position: 0,
  },
  {
    _id: '1',
    title: '写代码',
    content: '一杯茶，一包烟，一行代码写一天',
    status: 'active',
    projectId: '1',
    position: 1,
  },
  {
    _id: '2',
    title: '睡觉',
    content: '一睡睡一天',
    status: 'completed',
    projectId: '1',
    position: 2,
  },
]

export const useTasksStore = vi.fn(() => {
  return {
    findAllTasksNotRemoved() {
      return tasks
    },
  }
})
