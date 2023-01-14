import { expect, it } from 'vitest'
// import { createListProject } from '../listProject'
// import {
//   TaskState,
//   addTask,
//   completeTask,
//   createTask,
//   removeTask,
//   restoreTask,
// } from '../task'
// import {
//   completedSmartProject,
//   initCompletedSmartProject,
//   initTrashSmartProject,
//   trashSmartProject,
// } from '../smartProject'

// describe('task', () => {
//   it('should edit title of task', () => {
//     const task = createTask('coding')

//     task.title = 'eat'

//     expect(task.title).toBe('eat')
//   })
//   it('should edit content of task', () => {
//     const task = createTask('coding')
//     task.content = 'hi'

//     expect(task.content).toBe('hi')
//   })
//   it('add task to listProject ', () => {
//     const listProject = createListProject('one')
//     const firstTask = createTask('coding')
//     addTask(firstTask, listProject)
//     expect(listProject.tasks[0].title).toEqual('coding')

//     const secondTask = createTask('play game')
//     addTask(secondTask, listProject)
//     expect(listProject.tasks[0].title).toEqual('play game')
//   })

//   it('remove task', () => {
//     const listProject = createListProject('one')
//     const task = createTask('coding')
//     initTrashSmartProject()
//     addTask(task, listProject)

//     removeTask(task)

//     expect(listProject.tasks.length).toBe(0)
//     expect(trashSmartProject!.tasks[0].title).toBe('coding')
//   })

//   it('complete task', () => {
//     const listProject = createListProject('one')
//     const task = createTask('coding')
//     initCompletedSmartProject()
//     addTask(task, listProject)

//     completeTask(task)

//     expect(listProject.tasks.length).toBe(0)
//     expect(completedSmartProject!.tasks[0].title).toBe('coding')
//   })

//   it('restore task', () => {
//     const listProject = createListProject('one')
//     const task = createTask('coding')
//     initCompletedSmartProject()
//     addTask(task, listProject)
//     completeTask(task)

//     restoreTask(task)

//     expect(completedSmartProject.tasks.length).toBe(0)
//     expect(listProject!.tasks[0].title).toBe('coding')
//   })

//   it('task state', () => {
//     const task = createTask('coding')
//     expect(task.state).toEqual(TaskState.ACTIVE)

//     const listProject = createListProject('one')
//     addTask(task, listProject)
//     expect(task.state).toEqual(TaskState.ACTIVE)

//     completeTask(task)
//     expect(task.state).toEqual(TaskState.COMPLETED)

//     removeTask(task)
//     expect(task.state).toEqual(TaskState.REMOVED)
//   })
// })

it('task ', () => {
  expect(true).toBe(true)
})
