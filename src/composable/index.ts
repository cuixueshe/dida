import { computed } from 'vue'
export { useTaskOperationMessage } from './useTaskOperationMessage'
export { useTaskRightContextMenu } from './useTaskRightContextMenu'
export { useTaskSidebarDrag } from './useTaskSidebarDrag'
export { useTaskLeftListCreateProject } from './useTaskLeftListCreateProject'

export const useIsMac = () => computed(() => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) || false)
