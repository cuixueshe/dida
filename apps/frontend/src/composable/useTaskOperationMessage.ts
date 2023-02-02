import type { MessageReactive } from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { h } from 'vue'
import type { Task } from 'services/task'

enum TaskOperationStatus {
  Complete = '已完成',
  Remove = '删除完成',
}

export function useTaskOperationMessage() {
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

  function showCompleteMessage(task: Task, undoCallback: (undoFlag: boolean) => void) {
    let undoFlag = false
    const onClick = () => {
      undoFlag = true
      removeMessage()
    }
    const content = `${task.title} ${TaskOperationStatus.Complete}`

    messageReactive = message.info(createMessageView(content, onClick), {
      icon: () => null,
      duration: 1000,
      onAfterLeave() {
        undoCallback && undoCallback(undoFlag)
      },
    })
  }

  function showRemoveMessage(task: Task) {
    const content = `${task.title} ${TaskOperationStatus.Remove}`

    messageReactive = message.info(createMessageView(content), {
      icon: () => null,
      duration: 1000,
    })
  }

  return {
    showCompleteMessage,
    showRemoveMessage,
  }
}
