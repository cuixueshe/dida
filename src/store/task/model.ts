// 这个文件是纯数据层
import { fetchData } from './data'
import { Project } from './Project'
import { Task } from './Task'
import { SpecialProjectNames, TaskState } from './const'

// 1. 先请求后端接口获取数据  这里暂时使用 fetchData 来模拟后端返回的数据
// 2. 基于数据构建 model 层
export const projects: Project[] = []

// 完成的任务列表
export const completedProject = new Project(
  SpecialProjectNames.Complete,
  TaskState.COMPLETED,
)
// 删除的任务列表
export const trashProject = new Project(
  SpecialProjectNames.Trash,
  TaskState.REMOVED,
)

// 基于后端返回的数据做初始化
fetchData.projectList.forEach((projectListData) => {
  const project = new Project(projectListData.name)
  projectListData.tasks.forEach(({ title, content, state, id }) => {
    // 一个任务只能属于一个 project
    // 所以我们在构建的时候就需要区分出来 当前的 task 应该属于哪个 project
    const task = new Task(title, id)
    task.content = content
    if (state === TaskState.ACTIVE) {
      project.addTask(task)
    }
    else if (state === TaskState.COMPLETED) {
      // 需要额外设置下 task 之前的 project
      // 用户恢复项目的时候 会基于此来判断恢复到哪里
      task.previousProject = project
      completedProject.addTask(task)
    }
  })

  projects.push(project)
})

// 初始化垃圾桶 project
fetchData.trash.tasks.forEach(({ title, content, id }) => {
  const task = new Task(title, id)
  task.content = content
  task.state = TaskState.REMOVED
  trashProject.addTask(task)
})

export function findProjectByName(projectName: string) {
  switch (projectName) {
    case SpecialProjectNames.Complete:
      return completedProject
    case SpecialProjectNames.Trash:
      return trashProject
    default: {
      const project = projects.find((project) => {
        return project.name === projectName
      })
      if (project)
        return project
    }
  }
}
