import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Project, Task } from '../services/task'
import {
  addTaskToCompleteProject,
  addTaskToProject,
  createTask,
  findProjectByName,
  projects as projectListData,
  removeTaskToTrashProject,
  restoreTask as restoreTaskHandler,
} from '../services/task'

export const useTaskStore = defineStore('task', () => {
  const projects = reactive(projectListData)
  const currentActiveTask = ref<Task>()
  const currentActiveProject = ref<Project | undefined>(projects[0])

  const projectNames = computed(() => {
    return projects.map((project) => {
      return project.name
    })
  })

  function addTask(title: string) {
    const task = createTask(title)
    addTaskToProject(task, currentActiveProject.value!)
    changeActiveTask(task)
  }

  function changeActiveTask(task: Task | undefined) {
    currentActiveTask.value = task
  }

  function completeTask(task: Task) {
    addTaskToCompleteProject(task)
    changeActiveTask(undefined)
  }

  function removeTask(task: Task) {
    removeTaskToTrashProject(task)
    changeActiveTask(undefined)
  }

  function changeCurrentActiveProject(projectName: string) {
    changeActiveTask(undefined)
    currentActiveProject.value = findProjectByName(projectName)
  }

  function restoreTask(task: Task) {
    restoreTaskHandler(task)
    changeActiveTask(undefined)
  }

  function exchangeTwoTaskByIndex(index1: number, index2: number) {
    const task1 = currentActiveProject.value?.tasks[index1]
    const task2 = currentActiveProject.value?.tasks[index2]
    if (currentActiveProject.value && task1 && task2) {
      currentActiveProject.value.tasks[index1] = task2
      currentActiveProject.value.tasks[index2] = task1
    }
  }

  return {
    projects,
    currentActiveProject,
    projectNames,
    currentActiveTask,

    addTask,
    removeTask,
    completeTask,
    restoreTask,
    changeActiveTask,
    changeCurrentActiveProject,
    exchangeTwoTaskByIndex,
  }
})
