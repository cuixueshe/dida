import { reactive } from 'vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import type { MenuItem, MenuOptions } from '@imengyu/vue3-context-menu/index'
import { useTaskOperationMessage } from './useTaskOperationMessage'
import { useListProjectsStore, useTasksStore } from '@/store'

export function useTaskRightContextMenu() {
  const tasksStore = useTasksStore()
  const listProjectsStore = useListProjectsStore()
  const { showRemoveMessage, showMoveMessage } = useTaskOperationMessage()

  function createMenuData(x: number, y: number) {
    function createMoveItem(): MenuItem {
      function getMoveListProjects() {
        return listProjectsStore.projects
          .filter((project) => {
            return tasksStore.currentActiveTask?.projectId !== project.id
          })
          .map((project) => {
            return {
              label: project.name,
              onClick: () => {
                showMoveMessage(project.name)
                tasksStore.moveTaskToProject(
                  tasksStore.currentActiveTask!,
                  project.id,
                )
              },
            }
          })
      }

      return {
        label: '移动到',
        children: [...getMoveListProjects()],
      }
    }

    function createRemoveItem(): MenuItem {
      return {
        label: '删除',
        onClick: () => {
          showRemoveMessage(tasksStore.currentActiveTask!)
          tasksStore.removeTask(tasksStore.currentActiveTask!)
        },
      }
    }

    return reactive<MenuOptions>({
      x,
      y,
      items: [createMoveItem(), createRemoveItem()],
    })
  }

  function showContextMenu(e: MouseEvent) {
    e.preventDefault()
    ContextMenu.showContextMenu(createMenuData(e.x, e.y))
  }

  return {
    showContextMenu,
  }
}
