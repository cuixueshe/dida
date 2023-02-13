import { dialogInit } from '../helper'
import ProjectCreatedView from './ProjectCreatedView.vue'
import type { Project } from '@/services/task'
interface ProjectCreatedViewOptions {
  onOk?: (project: Project) => void
}
export function projectCreatedViewModal(options: ProjectCreatedViewOptions = {}) {
  return dialogInit(ProjectCreatedView, options)
}
