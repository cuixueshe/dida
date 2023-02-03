import { h } from 'vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import { useTaskOperationMessage } from './useTaskOperationMessage'
import { useTaskStore } from '@/store'

export function useTaskRightContextMenu() {
  const taskStore = useTaskStore()
  const { showRemoveMessage, showMoveMessage } = useTaskOperationMessage()

  function getMoveListProjects() {
    return taskStore.listProjects.map((projectItem) => {
      const isCurrentProject
        = taskStore.currentActiveTask?.project!.id === projectItem.id
      return {
        label: isCurrentProject
          ? h(
            'span',
            {
              style: {
                color: '#567dfa',
              },
            },
            projectItem.name,
          )
          : projectItem.name,
        onClick: () => {
          if (isCurrentProject)
            return
          showMoveMessage(projectItem.name)
          taskStore.moveTask(taskStore.currentActiveTask!, projectItem.id)
        },
      }
    })
  }

  function showContextMenu(e: MouseEvent) {
    e.preventDefault()
    ContextMenu.showContextMenu({
      x: e.x,
      y: e.y,
      items: [
        {
          label: '移动到',
          children: [...getMoveListProjects()],
        },
        {
          label: '删除',
          onClick: () => {
            showRemoveMessage(taskStore.currentActiveTask!)
            taskStore.removeTask(taskStore.currentActiveTask!)
          },
        },
      ],
    })
  }

  return {
    showContextMenu,
  }
}
