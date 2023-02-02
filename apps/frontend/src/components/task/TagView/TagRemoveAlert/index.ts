import { dialogInit } from '../helper'
import TagRemoveAlert from './TagRemoveAlert.vue'

export interface TagRemoveAlertOptions {
  show?: boolean
  tagName: string
}

export function tagRemoveAlert(options: TagRemoveAlertOptions) {
  return dialogInit(TagRemoveAlert, options)
}
