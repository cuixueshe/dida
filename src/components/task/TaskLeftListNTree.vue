<script setup lang="ts">
import {
  NTree,
} from 'naive-ui'
import { onMounted, ref } from 'vue'
import 'vue3-emoji-picker/css'
import ProjectCreateView from '@/components/task/ProjectCreatedView.vue'
import { useProjectSelectedStatusStore, useTaskStore } from '@/store'

const projectSelectedStatusStore = useProjectSelectedStatusStore()
const taskStore = useTaskStore()

const data = ref<any[]>([
  {
    key: 100,
    label: '清单',
    checkboxDisabled: false,
    isLeaf: false,
    children: taskStore.projectNames.map((projectName, index) => {
      return {
        key: 100 + index + 1,
        label: projectName,
        isLeaf: true,
      }
    }),
  },
])
const nodeProps = (treeOption: any) => {
  return {
    onClick() {
      const projectName = treeOption.option.label
      taskStore.changeCurrentActiveProject(projectName)
    },
  }
}

const projectViewRef = ref()
const projectRender = ref(undefined)

onMounted(() => {
  projectRender.value = projectViewRef.value.renderCreateProjectButton
})

function changeSelectedKey(key: number[]) {
  projectSelectedStatusStore.changeSelectedKey(key)
}
</script>

<template>
  <NTree
    v-model:selected-keys="projectSelectedStatusStore.selectedKey"
    block-line
    expand-on-click
    :default-expanded-keys="projectSelectedStatusStore.listDefaultSelectedKey"
    :render-suffix="projectRender"
    :data="data"
    :node-props="nodeProps"
    @update:selected-keys="changeSelectedKey"
  />
  <ProjectCreateView ref="projectViewRef" />
</template>

<style>
.n-tree.n-tree--block-line
  .n-tree-node:not(.n-tree-node--disabled).n-tree-node--pending {
  background-color: transparent;
}
.n-tree.n-tree--block-line
  .n-tree-node:not(.n-tree-node--disabled).n-tree-node--selected {
  background-color: var(--n-node-color-active);
}
</style>
