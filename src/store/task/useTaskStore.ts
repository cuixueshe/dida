// for vue
// 这个文件就会涉及到 vue 了
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { nanoid } from 'nanoid'
import { completedProject, projectList, trashProject } from './model'
import type { Project } from './Project'
import { Task } from './Task'
import { SpecialProjectNames, TaskState } from './const'

export const useTaskStore = defineStore('task', () => {
  const currentActiveTask = ref<Task | null>()
  const currentActiveProject = ref<Project>()
  const projectNames = reactive<string[]>(['快捷', '集草器'])

  // 取第一个 project 作为当前显示的
  currentActiveProject.value = projectList[0]

  function changeActiveTask(task: Task | null) {
    currentActiveTask.value = task
  }

  function addTask(title: string) {
    if (currentActiveProject.value) {
      const task = new Task(title, '', currentActiveProject.value, nanoid())
      currentActiveProject.value.addTask(task)
      changeActiveTask(task)
    }
  }

  function removeCurrentActiveTask() {
    if (currentActiveTask.value) {
      currentActiveProject.value?.removeTask(currentActiveTask.value)
      currentActiveTask.value.setState(TaskState.REMOVED)
      currentActiveTask.value.addToProject(trashProject)
    }
  }

  function changeCurrentActiveProject(projectName: string) {
    const project = projectList.find((project) => {
      return project.name === projectName
    })
    if (project)
      currentActiveProject.value = project

    else if (projectName === SpecialProjectNames.Complete)
      currentActiveProject.value = completedProject

    else if (projectName === SpecialProjectNames.Trash)
      currentActiveProject.value = trashProject

    changeActiveTask(null)
  }

  function setCurrentActiveTaskTitle(title: string) {
    if (currentActiveTask.value)
      currentActiveTask.value.title = title
  }

  function completeTask(task: Task) {
    task.setState(TaskState.COMPLETED)
    task.addToProject(completedProject)
  }

  function restoreTask(task: Task) {
    task.restore()
    changeActiveTask(null)
  }

  function shouldShowTodoAdd() {
    const name = currentActiveProject.value?.name
    return name !== SpecialProjectNames.Complete as string || name !== SpecialProjectNames.Trash
  }

  return {
    currentActiveTask,
    currentActiveProject,
    projectNames,

    addTask,
    completeTask,
    restoreTask,
    removeCurrentActiveTask,
    changeActiveTask,

    changeCurrentActiveProject,
    setCurrentActiveTaskTitle,

    shouldShowTodoAdd,
  }
})
