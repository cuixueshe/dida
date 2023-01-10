<script setup lang="ts">
import { NTree } from 'naive-ui'
import { ref } from 'vue'
import { useProjectSelectedStatusStore, useTaskStore } from '@/store'

const projectSelectedStatusStore = useProjectSelectedStatusStore()
const taskStore = useTaskStore()

const FITTERTREECODE = 100

const data = ref<any[]>([
  {
    key: 100,
    label: '清单',
    checkboxDisabled: false,
    isLeaf: false,
    children: taskStore.projectNames.map(
      (projectName, index) => {
        return {
          key: 100 + index + 1,
          label: projectName,
          isLeaf: true,
        }
      },
    ),
  },
])

const nodeProps = (treeOption: any) => {
  return {
    onClick() {
      if (treeOption.option.key === FITTERTREECODE)
        return
      const projectName = treeOption.option.label
      taskStore.changeCurrentActiveProject(projectName)
    },
  }
}

const changeSelectedKey = (key: number[]) => {
  if (key[0] === FITTERTREECODE)
    projectSelectedStatusStore.changePreSelectKey(projectSelectedStatusStore.selectedKey)

  projectSelectedStatusStore.changeSelectedKey(key)
}

const onExpandedKey = (key: number[]) => {
  if (key[0] === FITTERTREECODE)
    projectSelectedStatusStore.changeSelectedKey(projectSelectedStatusStore.preSelectKey)
}
</script>

<template>
  <NTree
    v-model:selected-keys="projectSelectedStatusStore.selectedKey"
    :default-expanded-keys="projectSelectedStatusStore.listDefaultSelectedKey"
    block-line
    expand-on-click
    :data="data"
    :node-props="nodeProps"
    @update:expanded-keys="onExpandedKey"
    @update:selected-keys="changeSelectedKey"
  />
</template>

<style>
.n-tree.n-tree--block-line .n-tree-node:not(.n-tree-node--disabled).n-tree-node--pending {
  background-color: transparent;
}
.n-tree.n-tree--block-line .n-tree-node:not(.n-tree-node--disabled).n-tree-node--selected {
  background-color: var(--n-node-color-active)
}
</style>
