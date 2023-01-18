import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Project, Task } from 'services/task'
import * as taskService from 'services/task'

const listProjects = reactive<Project[]>([])
const tasks = reactive<Task[]>([])
const currentActiveTask = ref<Task>()
// TODO 应该拿用户设置的一上来显示的 project 的id  来赋值 这里我们先写死取第一个
const currentActiveProject = ref<Project>(listProjects[0])

const listProjectNames = computed(() => {
  return listProjects.map((project) => {
    return project.name
  })
})

export async function initTask() {
  taskService.init(listProjects, tasks)
  await taskService.loadProjects()
  currentActiveProject.value = listProjects[0]
  if (currentActiveProject.value)
    await taskService.loadTasks(currentActiveProject.value)
}

function changeActiveTask(task: Task | undefined) {
  currentActiveTask.value = task
}

async function selectProject(project: Project) {
  await taskService.loadTasks(project)
  currentActiveProject.value = project
  changeActiveTask(undefined)
}

function useProject() {
  async function addProject(name: string) {
    const project = taskService.createListProject(name)
    await taskService.addListProject(project)
    await selectProject(project)
  }
  return {
    addProject,
  }
}

export const useTaskStore = defineStore('task', () => {
  function addTask(title: string) {
    if (currentActiveProject.value) {
      const task = taskService.createTask(title)
      taskService.addTask(task, currentActiveProject.value!.id)
      changeActiveTask(task)
    }
  }

  function completeTask(task: Task) {
    taskService.completeTask(task)
    changeActiveTask(undefined)
  }

  function removeTask(task: Task) {
    taskService.removeTask(task)
    changeActiveTask(undefined)
  }

  function restoreTask(task: Task) {
    taskService.restoreTask(task)
    changeActiveTask(undefined)
  }

  return {
    ...useProject(),

    tasks,
    listProjects,
    currentActiveProject,
    listProjectNames,
    currentActiveTask,
    addTask,
    removeTask,
    completeTask,
    restoreTask,
    changeActiveTask,
    selectProject,
  }
})
