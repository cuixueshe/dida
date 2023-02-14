import { dialogInit } from '../helper'
import TagCreateView from './TagCreateView.vue'
import type { Tag } from '@/services/task/listTag'

export interface TagCreateViewOptions {
  show?: boolean
  tag?: Omit<Tag, 'loadTasks'>
  onOk?: (tag: Tag) => void
}

export function tagCreateViewDialog(options: TagCreateViewOptions = {}) {
  return dialogInit(TagCreateView, options)
}
