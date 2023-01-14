import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ListProject, Task } from 'services/task'
import * as taskService from 'services/task'
import type { Project } from '@/services/task/listProject'

const listProjects = reactive<ListProject[]>([])
const tasks = reactive<Task[]>([])
const currentActiveTask = ref<Task>()
// TODO 应该拿用户设置的一上来显示的 project 的id  来赋值 这里我们先写死取第一个
const currentActiveProject = ref<ListProject>(listProjects[0])

const listProjectNames = computed(() => {
  return listProjects.map((project) => {
    return project.name
  })
})

export async function initTask() {
  taskService.init(listProjects, tasks)
  await taskService.loadProjects()
  currentActiveProject.value = listProjects[0]
  await taskService.loadTasks(currentActiveProject.value)
}

export const useTaskStore = defineStore('task', () => {
  function addTask(title: string) {
    if (currentActiveProject.value) {
      const task = taskService.createTask(title)
      taskService.addTask(task, currentActiveProject.value!.id)
      changeActiveTask(task)
    }
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

  async function selectProject(project: Project) {
    await taskService.loadTasks(project)
    changeActiveTask(undefined)
  }

  function restoreTask(task: Task) {
    taskService.restoreTask(task)
    changeActiveTask(undefined)
  }

  return {
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
