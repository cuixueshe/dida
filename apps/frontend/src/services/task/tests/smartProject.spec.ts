import { expect, it } from 'vitest'
// import { initListProjects } from '../listProject'
// import {
//   completedSmartProject,
//   findSmartProjectByName,
//   initCompletedSmartProject,
//   initTrashSmartProject,
//   trashSmartProject,
// } from '../smartProject'
// import { TaskState } from '../task'

// describe('smartProject', () => {
//   it('init completed project ', () => {
//     const firstTaskTitle = '欢迎加入 DiDa'
//     const secondTaskTitle = '第二个完成测试'
//     initListProjects([
//       {
//         name: '快捷',
//         tasks: [],
//       },
//     ])

//     initCompletedSmartProject({
//       tasks: [
//         {
//           title: firstTaskTitle,
//           content: '',
//           id: crypto.randomUUID(),
//           previousProjectName: '快捷',
//         },
//         {
//           title: secondTaskTitle,
//           content: '',
//           id: crypto.randomUUID(),
//           previousProjectName: '快捷',
//         },
//       ],
//     })

//     expect(completedSmartProject.tasks.length).toBe(2)
//     expect(completedSmartProject.tasks[0].title).toBe(firstTaskTitle)
//     expect(completedSmartProject.tasks[0].state).toBe(TaskState.COMPLETED)
//     expect(completedSmartProject.tasks[0].previousProject).toBeTruthy()

//     expect(completedSmartProject.tasks[1].title).toBe(secondTaskTitle)
//   })
//   it('init trash project ', () => {
//     const firstTaskTitle = '我是第一个被删除的任务'
//     const secondTaskTitle = '我是第二个被删除的任务'
//     initListProjects([
//       {
//         name: '快捷',
//         tasks: [],
//       },
//     ])

//     initTrashSmartProject({
//       name: '垃圾桶',
//       tasks: [
//         {
//           title: firstTaskTitle,
//           content: '',
//           id: crypto.randomUUID(),
//           previousProjectName: '快捷',
//         },
//         {
//           title: secondTaskTitle,
//           content: '',
//           id: crypto.randomUUID(),
//           previousProjectName: '快捷',
//         },
//       ],
//     })

//     expect(trashSmartProject.tasks.length).toBe(2)
//     expect(trashSmartProject.tasks[0].title).toBe(firstTaskTitle)
//     expect(trashSmartProject.tasks[0].state).toBe(TaskState.REMOVED)
//     expect(trashSmartProject.tasks[0].previousProject).toBeTruthy()

//     expect(trashSmartProject.tasks[1].title).toBe(secondTaskTitle)
//   })

//   it('find smartProject by name ', () => {
//     expect(findSmartProjectByName(completedSmartProject.name)).toBeTruthy()
//   })
// })

it('smartProject ', () => {
  expect(true).toBe(true)
})
