import { initTask } from './useTaskStore'
export { useCommandStore } from './useCommandStore'
export { useSearchStore } from './useSearch'
export { useThemeStore, getGlobalThemeStore } from './useTheme'
export { useTaskStore } from './useTaskStore'
export { useProjectSelectedStatusStore } from './useProjectSelectedStatusStore'
export { useTaskLeftMenuStatusStore } from './useTaskLeftMenuStatus'
export { useSettingsStore } from './useSettingsStore'
export { SmartProjectNames, TaskState } from '../services/task'

export async function initStore() {
  await initTask()
}
