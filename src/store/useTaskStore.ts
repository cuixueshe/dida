import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Project, Task } from 'services/task'
import * as taskService from 'services/task'

export const useTaskStore = defineStore('task', () => {
  const listProjects = reactive(taskService.projects)
  const currentActiveTask = ref<Task>()
  const currentActiveProject = ref<Project | undefined>(listProjects[0])
  const listProjectNames = computed(() => {
    return listProjects.map((project) => {
      return project.name
    })
  })

  function addTask(title: string) {
    const task = taskService.createTask(title)
    taskService.addTask(task, currentActiveProject.value!)
    changeActiveTask(task)
  }

  function changeActiveTask(task: Task | undefined) {
    currentActiveTask.value = task
  }

  function completeTask(task: Task) {
    taskService.completeTask(task)
    changeActiveTask(undefined)
  }

  function removeTask(task: Task) {
    taskService.removeTask(task)
    changeActiveTask(undefined)
  }

  function changeCurrentActiveProject(projectName: string) {
    let targetProject: Project | undefined

    targetProject = taskService.findSmartProjectByName(projectName)
    if (!targetProject)
      targetProject = taskService.findProjectByName(projectName)

    currentActiveProject.value = targetProject
    changeActiveTask(undefined)
  }

  function restoreTask(task: Task) {
    taskService.restoreTask(task)
    changeActiveTask(undefined)
  }

  function changeCurrentActiveProjectAndCurrentTask(
    projectName: string,
    taskId: string,
  ) {
    changeCurrentActiveProject(projectName)
    changeActiveTask(
      currentActiveProject.value?.tasks.find(item => item.id === taskId),
    )
  }

  return {
    listProjects,
    currentActiveProject,
    listProjectNames,
    currentActiveTask,
    addTask,
    removeTask,
    completeTask,
    restoreTask,
    changeActiveTask,
    changeCurrentActiveProject,
    changeCurrentActiveProjectAndCurrentTask,
  }
})
