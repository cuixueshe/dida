import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchAllTasks,
  fetchCompleteTask,
  fetchCreateTask,
  fetchRemoveTask,
  fetchRestoreTask,
  fetchUpdateTaskContent,
  fetchUpdateTaskPosition,
  fetchUpdateTaskTitle,
} from '@/api'

export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  REMOVED = 'removed',
}

export interface Task {
  id: string
  title: string
  status: TaskStatus
  content: string
  projectId: string
  position: number
}

export const useTaskStore = defineStore('newTask', () => {
  const tasks = ref<Task[]>([])
  const currentActiveTask = ref<Task>()
  // TODO 后面统一处理 project
  const currentActiveProject = {
    name: '哈哈',
    loadTasks(): any {},
    id: '1',
  }

  async function init() {
    const rawTasks: any = await fetchAllTasks(
      currentActiveProject.id,
      TaskStatus.ACTIVE,
    )
    tasks.value = rawTasks.map(normalizeTask)
  }

  async function addTask(title: string) {
    const newRawTask = await fetchCreateTask(title, currentActiveProject.id)
    const task = normalizeTask(newRawTask)
    tasks.value.unshift(task)
    changeActiveTask(task)
  }

  function changeActiveTask(task: Task | undefined) {
    currentActiveTask.value = task
  }

  async function completeTask(task: Task) {
    await fetchCompleteTask(task.id)
    task.status = TaskStatus.COMPLETED
    tasks.value = tasks.value.filter(t => t.id !== task.id)
    changeActiveTask(undefined)
  }

  async function restoreTask(task: Task) {
    function taskPositionRestorer(task: Task) {
      const lastTask = tasks.value[tasks.value.length - 1]
      if (task.position < lastTask.position) {
        tasks.value.push(task)
        return
      }

      for (let i = 0; i < tasks.value.length; i++) {
        if (task.position > tasks.value[i].position) {
          const currentIndex = tasks.value.indexOf(tasks.value[i])
          tasks.value.splice(currentIndex, 0, task)
          return
        }
      }
    }

    await fetchRestoreTask(task.id)
    task.status = TaskStatus.ACTIVE

    taskPositionRestorer(task)
  }

  async function removeTask(task: Task) {
    await fetchRemoveTask(task.id)
    task.status = TaskStatus.REMOVED
    tasks.value = tasks.value.filter(t => t.id !== task.id)
    changeActiveTask(undefined)
  }

  async function updateTaskTitle(task: Task, newTitle: string) {
    const oldTitle = task.title
    if (newTitle === oldTitle)
      return

    await fetchUpdateTaskTitle(task.id, newTitle)
    task.title = newTitle
  }

  async function updateTaskContent(task: Task, newContent: string) {
    const oldContent = task.content
    if (newContent === oldContent)
      return

    await fetchUpdateTaskContent(task.id, newContent)
    task.content = newContent
  }

  async function updateTaskPosition(task: Task, newPosition: number) {
    const oldPosition = task.position
    if (newPosition === oldPosition)
      return

    await fetchUpdateTaskPosition(task.id, newPosition)
    task.position = newPosition
  }

  function addTaskToTag(title: string) {
    // eslint-disable-next-line no-console
    console.log(title)
  }

  return {
    tasks,
    currentActiveTask,
    currentActiveProject,
    init,
    addTaskToTag,
    addTask,
    removeTask,
    changeActiveTask,
    completeTask,
    restoreTask,
    updateTaskTitle,
    updateTaskContent,
    updateTaskPosition,
  }
})

// TODO 这里的 any 后面应该改成后端返回来的接口shape
function normalizeTask(rawTask: any): Task {
  return {
    id: rawTask._id,
    title: rawTask.title,
    content: rawTask.content,
    status: rawTask.status,
    projectId: rawTask.projectId,
    position: rawTask.position,
  }
}
