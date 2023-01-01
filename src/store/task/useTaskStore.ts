import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { SpecialProjectNames, addTaskToCompleteProject, addTaskToProject, findProjectByName, projects as projectListData, removeTaskToTrashProject } from './project'
import type { Project } from './project'
import type { Task } from './task'
import { createTask, restoreTask as restoreTaskHandler } from './task'

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

  function shouldShowTodoAdd() {
    const name = currentActiveProject.value?.name
    return (
      name !== (SpecialProjectNames.Complete as string)
      && name !== SpecialProjectNames.Trash
    )
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
    shouldShowTodoAdd,
  }
})
