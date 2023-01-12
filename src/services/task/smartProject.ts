import { mockProjectData } from './data'
import type { FetchListProjectData } from './listProject'
import type { Project } from './project'
import { TaskState, addTask, createTask } from './task'
export const statusMapping = {
  SHOW: '显示',
  HIDE: '隐藏',
  SHOW_WHEN_THERE_IS_CONTENT: '当有内容时显示',
} as const
export type TaskType = keyof typeof taskTypeMapping
export type TaskTypeValue = typeof taskTypeMapping[TaskType]
export type Status = keyof typeof statusMapping
export interface SmartProject extends Project {
  key: number
  status: Status
  icon: string
  name: TaskTypeValue
}
/**
 * 这里后期可以替换为i18n + 联合类型
 * @example type a = AllSmartProject["name"] | TodaySmartProject["name"]
 */
const taskTypeMapping = {
  all: '所有',
  today: '今天',
  tomorrow: '明天',
  last7Days: '最近7天',
  assignToMe: '指派给我',
  completed: '已完成',
  failed: '已放弃',
  trash: '垃圾桶',
  abstract: '摘要',
  tag: '标签',
  filter: '过滤器',
} as const
interface AllSmartProject extends SmartProject {
  name: '所有'
}
interface TodaySmartProject extends SmartProject {
  name: '今天'
}
interface TomorrowSmartProject extends SmartProject {
  name: '明天'
}
interface Last7DaysSmartProject extends SmartProject {
  name: '最近7天'
}
interface AssignToMeSmartProject extends SmartProject {
  name: '指派给我'
}
interface CompletedSmartProject extends SmartProject {
  name: '已完成'
}
interface TrashSmartProject extends SmartProject {
  name: '垃圾桶'
}
interface FailedSmartProject extends SmartProject {
  name: '已放弃'
}

interface AbstractSmartProject extends SmartProject {
  name: '摘要'
}
interface TagSmartProject extends SmartProject {
  name: '标签'
}
interface FilterSmartProject extends SmartProject {
  name: '过滤器'
}
export type SmartProjectsType = Record<TaskType, SmartProject>

export function createAllSmartProject(): AllSmartProject {
  return {
    key: 1,
    status: 'SHOW',
    icon: 'ic:outline-clear-all',
    name: '所有',
    tasks: [],
  }
}

export function createTodaySmartProject(): TodaySmartProject {
  return {
    key: 2,
    status: 'SHOW',
    icon: 'mdi:calendar-today-outline',
    name: '今天',
    tasks: [],
  }
}
export function createTomorrowSmartProject(): TomorrowSmartProject {
  return {
    key: 3,
    status: 'SHOW',
    icon: 'pixelarticons:calendar-tomorrow',
    name: '明天',
    tasks: [],
  }
  // eslint-disable-next-line max-statements-per-line
} export function createLast7DaysSmartProject(): Last7DaysSmartProject {
  return {
    key: 4,
    status: 'SHOW',
    icon: 'material-symbols:calendar-month-outline-rounded',
    name: '最近7天',
    tasks: [],
  }
}
export function createAssignToMeSmartProject(): AssignToMeSmartProject {
  return {
    key: 5,
    status: 'SHOW',
    icon: 'pajamas:assignee',
    name: '指派给我',
    tasks: [],
  }
}
export function createCompletedSmartProject(): CompletedSmartProject {
  return {
    key: 6,
    status: 'SHOW',
    icon: 'ep:finished',
    name: '已完成',
    tasks: [],
  }
}
export function createFailedSmartProject(): FailedSmartProject {
  return {
    key: 7,
    status: 'SHOW',
    icon: 'fluent-mdl2:error-badge',
    name: '已放弃',
    tasks: [],
  }
}
export function createTrashSmartProject(): TrashSmartProject {
  return {
    key: 8,
    status: 'SHOW',
    icon: 'mdi:trash-outline',
    name: '垃圾桶',
    tasks: [],
  }
}

export function createAbstractSmartProject(): AbstractSmartProject {
  return {
    key: 9,
    status: 'SHOW',
    icon: 'bxs:collection',
    name: '摘要',
    tasks: [],
  }
}
export function createTagSmartProject(): TagSmartProject {
  return {
    key: 10,
    status: 'SHOW',
    icon: 'mdi:tag',
    name: '标签',
    tasks: [],
  }
}
export function createFilterSmartProject(): FilterSmartProject {
  return {
    key: 11,
    status: 'SHOW',
    icon: 'material-symbols:filter-alt-outline',
    name: '过滤器',
    tasks: [],
  }
}
export const allSmartProject = createAllSmartProject()
export const todaySmartProject = createTodaySmartProject()
export const tomorrowSmartProject = createTomorrowSmartProject()
export const last7DaysSmartProject = createLast7DaysSmartProject()
export const assignToMeSmartProject = createAssignToMeSmartProject()
export const trashSmartProject = createTrashSmartProject()
export const completedSmartProject = createCompletedSmartProject()
export const failedSmartProject = createFailedSmartProject()
export const abstractSmartProject = createAbstractSmartProject()
export const tagSmartProject = createTagSmartProject()
export const filterSmartProject = createFilterSmartProject()
export const smartProjects: Record<TaskType, SmartProject> = {
  all: allSmartProject,
  today: todaySmartProject,
  tomorrow: tomorrowSmartProject,
  last7Days: last7DaysSmartProject,
  assignToMe: assignToMeSmartProject,
  completed: completedSmartProject,
  failed: failedSmartProject,
  trash: trashSmartProject,
  abstract: abstractSmartProject,
  tag: tagSmartProject,
  filter: filterSmartProject,
}
export function __initSmartProject(smartProject: SmartProject, { tasks }: FetchListProjectData) {
  smartProject.tasks = []
  tasks?.reverse().forEach(({ id, title, content, previousProjectName }) => {
    const task = createTask(title, id, content)
    task.previousProject = findSmartProjectByName(previousProjectName)
    addTask(task, smartProject)
    // 这里状态要重写
    task.state = TaskState.COMPLETED
  })
}
export function initCompletedSmartProject({ tasks = [] }: FetchListProjectData = {}) {
  trashSmartProject.tasks = []
  tasks.reverse().forEach(({ id, title, content, previousProjectName }) => {
    const task = createTask(title, id, content)
    task.previousProject = findSmartProjectByName(previousProjectName)
    addTask(task, trashSmartProject)
    task.state = TaskState.COMPLETED
  })
}
export function initTrashSmartProject({ tasks = [] }: FetchListProjectData = {}) {
  trashSmartProject.tasks = []
  tasks.reverse().forEach(({ id, title, content, previousProjectName }) => {
    const task = createTask(title, id, content)
    task.previousProject = findSmartProjectByName(previousProjectName)
    addTask(task, trashSmartProject)
    task.state = TaskState.REMOVED
  })
}
export async function initSmartProjectByName(name: TaskType) {
  const data = await mockProjectData(name as any, 200)
  __initSmartProject(smartProjects[name], data)
}
export function initSmartProject() {
  (Object.keys(smartProjects || {}) as TaskType[])
    .forEach((v) => {
      initSmartProjectByName(v)
    })
}

export function findSmartProjectByName(name?: string) {
  if (name === undefined)
    return undefined

  return smartProjects[name as keyof typeof smartProjects]
}

export function isSmartProject(projectName: string) {
  return !!smartProjects[projectName as keyof typeof smartProjects]
}
export const toggleStatus = (key: keyof typeof smartProjects, status: Status) => {
  smartProjects[key].status = status
}
