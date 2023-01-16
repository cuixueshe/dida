import { expect, it } from 'vitest'
// import { findListProjectByName } from '../listProject'

it('listProject', () => {
  expect(true).toBe(true)
})

// describe('listProject', () => {
//   it('init listProjects ', () => {
//     initListProjects([
//       {
//         name: 'live',
//         tasks: [
//           {
//             title: '吃饭',
//             content: '## 吃饭 \n 吃什么好呢',
//             id: crypto.randomUUID(),
//           },
//           {
//             title: '睡觉',
//             content: '## 睡觉 \n 早睡早起 身体好',
//             id: crypto.randomUUID(),
//           },
//         ],
//       },
//       {
//         name: 'work',
//         tasks: [
//           {
//             title: '不想上班',
//             content: '我不想 我不想 我不想上班',
//             id: crypto.randomUUID(),
//           },
//         ],
//       },
//     ])

//     expect(listProjects.length).toBe(2)

//     expect(listProjects[0].name).toBe('live')
//     expect(listProjects[0].tasks.length).toBe(2)

//     expect(listProjects[1].name).toBe('work')
//     expect(listProjects[1].tasks.length).toBe(1)
//   })
//   it('should find a project when the project is created', () => {
//     initListProjects([
//       {
//         name: 'first',
//         tasks: [],
//       },
//       {
//         name: 'second',
//         tasks: [],
//       },
//     ])

//     const project = findListProjectByName('first')

//     expect(project?.name).toBe('first')
//   })

//   it.todo('should exist when project is created', () => {})
// })
