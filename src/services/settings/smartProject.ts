export interface VisibleOption {
  label: '显示'
  value: SmartProjectOptionValue
}
interface HiddenOption {
  label: '隐藏'
  value: SmartProjectOptionValue
}

type Options = Array<VisibleOption | HiddenOption>

interface SettingsSmartProject {
  title: string
  options: Options
  option: string
  icon: string
}

export enum SmartProjectOptionValue {
  Visible = 'visible',
  Hidden = 'hidden',
}

function createOptions() {
  const visibleOption: VisibleOption = {
    label: '显示',
    value: SmartProjectOptionValue.Visible,
  }

  const hiddenOption: HiddenOption = {
    label: '隐藏',
    value: SmartProjectOptionValue.Hidden,
  }
  return [visibleOption, hiddenOption]
}

const completedSmartProject: SettingsSmartProject = {
  title: '已完成',
  options: createOptions(),
  option: 'visible',
  icon: 'material-symbols:check-box',
}

const trashSmartProject = {
  title: '垃圾桶',
  options: createOptions(),
  option: 'visible',
  icon: 'mdi:close-box',
}

export function setHideSmartProject(project: SettingsSmartProject) {
  project.option = SmartProjectOptionValue.Hidden
}

export const smartProjects = [completedSmartProject, trashSmartProject]
