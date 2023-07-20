import { ref, watch, watchEffect } from 'vue'
import { watchOnce } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useListProjectsStore } from '@/store/listProjects'

interface Node {
  name: string
}

export const useTaskLeftListStore = defineStore('taskLeftList', () => {
  const listProjectsStore = useListProjectsStore()
  const listProjectRootNode: Node = {
    name: '清单',
  }

  const selectedKey = ref<string>('')
  const listProjectChildrenNodes = ref<Node[]>([])

  watchEffect(() => {
    listProjectChildrenNodes.value = listProjectsStore.projects.map((p) => {
      return {
        name: p.name,
      }
    })
  })

  // 初始化默认的选择
  watchOnce(
    () => listProjectChildrenNodes.value,
    (value) => {
      selectedKey.value = value[0]?.name || ''
    },
  )

  // 当更新列表清单的时候 同步下 selectedKeys
  watch(
    () => listProjectChildrenNodes.value,
    (newValue, oldValue) => {
      if (!oldValue.length)
        return

      if (newValue.length > oldValue.length)
        selectedKey.value = newValue[newValue.length - 1].name
      else if (oldValue.length > newValue.length)
        selectedKey.value = newValue[0].name
    },
  )

  watch(selectedKey, (newValue, oldValue) => {
    // 当点击 rootNode 的时候不应该改变选择的 project
    if (newValue === listProjectRootNode.name)
      selectedKey.value = oldValue
    else
      listProjectsStore.selectProject(newValue)
  })

  return {
    selectedKey,
    listProjectRootNode,
    listProjectChildrenNodes,
  }
})
