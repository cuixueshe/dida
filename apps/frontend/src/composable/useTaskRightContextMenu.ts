import ContextMenu from '@imengyu/vue3-context-menu'
import { useTaskOperationMessage } from './useTaskOperationMessage'
import { useTaskStore } from '@/store'
import { findListProjectByName } from '@/services/task'

export function useTaskRightContextMenu() {
  const taskStore = useTaskStore()
  const { showRemoveMessage, showMoveMessage } = useTaskOperationMessage()

  function showContextMenu(e: MouseEvent) {
    e.preventDefault()
    ContextMenu.showContextMenu({
      x: e.x,
      y: e.y,
      items: [
        {
          label: 'remove',
          onClick: () => {
            showRemoveMessage(taskStore.currentActiveTask!)
            taskStore.removeTask(taskStore.currentActiveTask!)
          },
        },
        {
          label: '移动到',
          children: [
            ...taskStore.listProjectNames.map(
              projectname => ({
                label: projectname,
                onClick: () => {
                  const project = findListProjectByName(projectname)
                  showMoveMessage(taskStore.currentActiveTask!, projectname)
                  taskStore.addSpecifyTask(taskStore.currentActiveTask!, project?.id)
                  taskStore.removeTask(taskStore.currentActiveTask!)
                },
              }),
            ),
          ],
          onClick: () => {
          },
        },
      ],
    })
  }

  return {
    showContextMenu,
  }
}
