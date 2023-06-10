import type { MessageReactive } from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { h } from 'vue'
import type { Task } from '@/store'
import { useTasksStore } from '@/store'

enum TaskOperationStatus {
  Complete = '已完成',
  Remove = '删除完成',
  Move = '移动到',
}

export function useTaskOperationMessage() {
  const tasksStore = useTasksStore()
  const { message } = createDiscreteApi(['message'])

  let messageReactive: MessageReactive | null = null

  function createMessageView(content: string, onClick?: () => void) {
    return () =>
      h('p', null, [
        h('span', null, `${content}`),
        onClick
          ? h(
            'i',
            {
              style:
                  'color: teal;font-style:unset;cursor:pointer;margin-left: 20px',
              onClick,
            },
            '撤销',
          )
          : null,
      ])
  }

  function removeMessage() {
    if (messageReactive) {
      messageReactive.destroy()
      messageReactive = null
    }
  }

  function showCompleteMessage(task: Task) {
    const onClick = () => {
      tasksStore.cancelCompleteTask(task)
      removeMessage()
    }
    const content = `${task.title} ${TaskOperationStatus.Complete}`

    messageReactive = message.info(createMessageView(content, onClick), {
      icon: () => null,
      duration: 2500,
    })
  }

  function showRemoveMessage(task: Task) {
    const content = `${task.title} ${TaskOperationStatus.Remove}`

    messageReactive = message.info(createMessageView(content), {
      icon: () => null,
      duration: 1000,
    })
  }

  function showMoveMessage(projectName: string) {
    const content = `${TaskOperationStatus.Move} ${projectName} 清单`
    messageReactive = message.info(createMessageView(content), {
      icon: () => null,
      duration: 1000,
    })
  }

  return {
    showCompleteMessage,
    showRemoveMessage,
    showMoveMessage,
  }
}
