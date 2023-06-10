import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchAllTasks,
  fetchCompleteTask,
  fetchCreateTask,
  fetchMoveTaskToProject,
  fetchRemoveTask,
  fetchRestoreTask,
  fetchUpdateTaskContent,
  fetchUpdateTaskPosition,
  fetchUpdateTaskTitle,
} from '@/api'
import { useTasksSelectorStore } from '@/store'

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

export const useTasksStore = defineStore('tasksStore', () => {
  const tasksSelectorStore = useTasksSelectorStore()

  const tasks = ref<Task[]>([])
  const currentActiveTask = ref<Task>()

  function updateTasks(rawTasks: any) {
    tasks.value = rawTasks.map(normalizeTask)
  }

  async function addTask(title: string) {
    if (!tasksSelectorStore.currentSelector)
      return

    if (tasksSelectorStore.currentSelector.type !== 'listProject')
      return

    const newRawTask = await fetchCreateTask(title, tasksSelectorStore.currentSelector.id)
    const task = normalizeTask(newRawTask)
    tasks.value.unshift(task)
    changeActiveTask(task)
  }

  function changeActiveTask(taskId: Task['id']): void
  function changeActiveTask(task: Task | undefined): void
  function changeActiveTask(taskOrTaskId: Task | Task['id'] | undefined): void {
    let task: Task | undefined

    if (typeof taskOrTaskId === 'string')
      task = tasks.value.find(t => t.id === taskOrTaskId)

    else
      task = taskOrTaskId

    currentActiveTask.value = task
  }

  async function completeTask(task: Task) {
    await fetchCompleteTask(task.id)
    task.status = TaskStatus.COMPLETED
    tasks.value = tasks.value.filter(t => t.id !== task.id)
    changeActiveTask(undefined)
  }

  async function restoreTask(task: Task) {
    await fetchRestoreTask(task.id)
    task.status = TaskStatus.ACTIVE

    tasks.value = tasks.value.filter(t => t.id !== task.id)
  }

  async function cancelCompleteTask(task: Task) {
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

  async function findAllTasksNotRemoved() {
    const activeTasks: any = await fetchAllTasks({ status: TaskStatus.ACTIVE })
    const completedTasks: any = await fetchAllTasks({ status: TaskStatus.COMPLETED })

    return [...activeTasks.map(normalizeTask), ...completedTasks.map(normalizeTask)]
  }

  async function moveTaskToProject(task: Task, projectId: string) {
    await fetchMoveTaskToProject(task.id, projectId)
    task.projectId = projectId

    tasks.value = tasks.value.filter(t => t.id !== task.id)
  }

  return {
    tasks,
    currentActiveTask,
    addTask,
    removeTask,
    updateTasks,
    changeActiveTask,
    completeTask,
    restoreTask,
    moveTaskToProject,
    cancelCompleteTask,
    updateTaskTitle,
    updateTaskContent,
    updateTaskPosition,
    findAllTasksNotRemoved,
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
