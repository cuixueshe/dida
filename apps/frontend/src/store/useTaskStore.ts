import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Project, Task } from '../services/task'
import * as taskService from '../services/task'

export const useTaskStore = defineStore('task', () => {
  const projects = reactive(taskService.projects)
  const currentActiveTask = ref<Task>()
  const currentActiveProject = ref<Project | undefined>(projects[0])

  const projectNames = computed(() => {
    return projects.map((project) => {
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
    currentActiveProject.value = taskService.findProjectByName(projectName)
    changeActiveTask(undefined)
  }

  function restoreTask(task: Task) {
    taskService.restoreTask(task)
    changeActiveTask(undefined)
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
  }
})
