import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Project, Task } from 'services/task'
import * as taskService from 'services/task'
import { findListProjectById } from 'services/task/listProject'
import type { Tag } from '@/services/task/listTag'

const listProjects = reactive<Project[]>([])
const tasks = reactive<Task[]>([])
const listTags = reactive<Tag[]>([])

taskService.init(listProjects, tasks, listTags)

const currentActiveTask = ref<Task>()
// TODO 应该拿用户设置的一上来显示的 project 的id  来赋值 这里我们先写死取第一个
const currentActiveProject = ref<Project | Tag>(listProjects[0])

const listProjectNames = computed(() => {
  return listProjects.map((project) => {
    return project.name
  })
})

async function init() {
  await taskService.loadProjects()
  await iniTags()
  if (listProjects.length === 0)
    return
  currentActiveProject.value = listProjects[0]
  await taskService.loadTasks(currentActiveProject.value)
}

async function iniTags() {
  await taskService.loadTags()
}

function changeActiveTask(task: Task | undefined) {
  currentActiveTask.value = task
}

async function selectCategory(category: Project | Tag) {
  await taskService.loadTasks(category)
  currentActiveProject.value = category
  changeActiveTask(undefined)
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

function useTag() {
  async function addTag(tagVal: {
    name: string
    parentTagId?: number
    color: string
  }) {
    const tag = taskService.createListTag(
      tagVal.name,
      tagVal.color,
      tagVal.parentTagId,
    )
    await taskService.addListTag(tag)
    await selectCategory(tag)
  }

  async function editTag(tag: {
    id: number
    name: string
    parentTagId?: number
    color: string
  }) {
    const origin = listTags.find(t => t.id === tag.id)
    if (!origin)
      return
    await taskService.updateListTag({
      ...tag,
      parentTagId: tag.parentTagId || null,
    })
    origin.name = tag.name
    origin.color = tag.color
    origin.parentTagId = tag.parentTagId || null
  }

  async function deleteTag(id: number) {
    await taskService.deleteListTag(id)
  }

  return {
    addTag,
    editTag,
    deleteTag,
  }
}

export const useTaskStore = defineStore('task', () => {
  async function addTask(title: string) {
    if (currentActiveProject.value) {
      const task = taskService.createTask(title)
      const tasks = await findListProjectById(
        currentActiveProject.value!.id,
      )!.loadTasks()
      task.index = tasks.length
      taskService.addTask(task, currentActiveProject.value!.id)
      changeActiveTask(task)
    }
  }

  function addTaskToTag(title: string) {
    if (!currentActiveProject.value)
      return
    const task = taskService.createTask(title)
    taskService.addTask(task, undefined, [currentActiveProject.value.id])
    changeActiveTask(task)
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

  function moveTask(task: Task, targetProjectId: number) {
    taskService.moveTask(task, targetProjectId)
    changeActiveTask(undefined)
  }

  return {
    ...useProject(),
    ...useTag(),
    tasks,
    listProjects,
    currentActiveProject,
    listProjectNames,
    currentActiveTask,
    addTask,
    removeTask,
    completeTask,
    restoreTask,
    moveTask,
    changeActiveTask,
    selectProject,
    init,
    listTags,
    selectCategory,
    addTaskToTag,
  }
})
