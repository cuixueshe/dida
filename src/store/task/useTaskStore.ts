// for vue
// 这个文件就会涉及到 vue 了
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  completedProject,
  findProjectByName,
  projects as projectsData,
  trashProject,
} from './model'
import type { Project } from './Project'
import { Task } from './Task'
import { SpecialProjectNames } from './const'

export const useTaskStore = defineStore('task', () => {
  const projects = ref<Project[]>(projectsData)
  const currentActiveTask = ref<Task | null>()
  const currentActiveProject = ref<Project>()
  const projectNames = computed(() => {
    return projects.value.map((project) => {
      return project.name
    })
  })

  // 取第一个 project 作为当前显示的
  currentActiveProject.value = projects.value[0]

  function changeActiveTask(task: Task | null) {
    currentActiveTask.value = task
  }

  function addTask(title: string) {
    if (currentActiveProject.value) {
      const task = new Task(title)
      currentActiveProject.value.addTask(task)
      changeActiveTask(task)
    }
  }

  function putTaskToTrash(task: Task) {
    task.moveToProject(trashProject)
  }

  function changeCurrentActiveProject(projectName: string) {
    changeActiveTask(null)
    currentActiveProject.value = findProjectByName(projectName)
  }

  function completeTask(task: Task) {
    task.moveToProject(completedProject)
  }

  function restoreTask(task: Task) {
    task.restore()
    changeActiveTask(null)
  }

  function shouldShowTodoAdd() {
    const name = currentActiveProject.value?.name
    return (
      name !== (SpecialProjectNames.Complete as string)
      && name !== SpecialProjectNames.Trash
    )
  }

  return {
    currentActiveTask,
    currentActiveProject,
    projectNames,

    addTask,
    completeTask,
    restoreTask,
    putTaskToTrash,
    changeActiveTask,
    changeCurrentActiveProject,
    shouldShowTodoAdd,
  }
})
