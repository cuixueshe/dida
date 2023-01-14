<script setup lang="ts">
import { findListProjectByName } from 'services/task'
import type { TreeOption } from 'naive-ui'
import { NTree } from 'naive-ui'
import { onMounted, ref, watchEffect } from 'vue'
import { useProjectSelectedStatusStore, useTaskStore } from '@/store'
import 'vue3-emoji-picker/css'
import ProjectCreateView from '@/components/task/ProjectCreatedView.vue'

enum TreeRootKeys {
  PROJECT = 100,
  TAG = 200,
}

const { projectViewRef, projectRender } = useCreateProjectButton()

function useCreateProjectButton() {
  const projectViewRef = ref()
  const projectRender = ref(undefined)
  onMounted(() => {
    projectRender.value = projectViewRef.value.renderCreateProjectButton
  })
  return {
    projectRender,
    projectViewRef,
  }
}

const projectSelectedStatusStore = useProjectSelectedStatusStore()
const taskStore = useTaskStore()

// fake data to simulate tags render
const fakeTagsNamesData = ref<string[]>([])
const defaultExpandedKeys = ref<TreeRootKeys[]>([])
const treeProjectChildren = ref<TreeOption[]>([])

watchEffect(() => {
  treeProjectChildren.value = taskStore.listProjectNames.map(
    (projectname, index) => ({
      key: TreeRootKeys.PROJECT + index + 1,
      label: projectname,
      isleaf: true,
    }),
  )
  defaultExpandedKeys.value = [
    ...new Set([
      ...(taskStore.listProjectNames.length ? [] : [TreeRootKeys.PROJECT]),
      ...(fakeTagsNamesData.value.length ? [] : [TreeRootKeys.TAG]),
      ...projectSelectedStatusStore.listDefaultSelectedKey,
    ]),
  ]
})

const data = ref<any[]>([
  {
    key: TreeRootKeys.PROJECT,
    label: '清单',
    checkboxDisabled: false,
    isLeaf: false,
    children: treeProjectChildren,
  },
  {
    key: TreeRootKeys.TAG,
    label: '标签',
    checkboxDisabled: false,
    isLeaf: false,
    children: fakeTagsNamesData.value.length
      ? fakeTagsNamesData.value
      : [
          {
            label:
              '以标签的维度展示不同清单的任务。在添加任务时输入“#”可快速选择标签',
            placeholder: true,
          },
        ],
  },
])
const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      if (
        option.key === TreeRootKeys.PROJECT
        || option.key === TreeRootKeys.TAG
      )
        return
      const project = findListProjectByName(option.label)
      if (project)
        taskStore.selectProject(project)
    },
    class: option.placeholder ? 'placeholder' : '',
  }
}

const changeSelectedKey = (key: number[]) => {
  if (key[0] === TreeRootKeys.PROJECT) {
    projectSelectedStatusStore.changePreSelectKey(
      projectSelectedStatusStore.selectedKey,
    )
  }

  projectSelectedStatusStore.changeSelectedKey(key)
}

const onExpandedKey = (key: number[]) => {
  if (key.includes(TreeRootKeys.PROJECT)) {
    projectSelectedStatusStore.changeSelectedKey(
      projectSelectedStatusStore.preSelectKey,
    )
  }
}
</script>

<template>
  <NTree
    v-model:selected-keys="projectSelectedStatusStore.selectedKey"
    :default-expanded-keys="defaultExpandedKeys"
    :render-suffix="projectRender"
    block-line
    expand-on-click
    :data="data"
    :node-props="nodeProps"
    @update:expanded-keys="onExpandedKey"
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

.n-tree-node-wrapper .placeholder .n-tree-node-indent {
  display: none;
}

.n-tree-node-wrapper .placeholder .n-tree-node-switcher {
  display: none;
}

.n-tree-node-wrapper .placeholder {
  pointer-events: none;
  padding: 6px 8px;
  margin: 0 8px 0 20px;
  background-color: rgb(25, 25, 25, 0.03);
  border-radius: 4px;
}

.n-tree-node-wrapper .placeholder .n-tree-node-content__text {
  color: rgb(25, 25, 25, 0.4);
  font-size: 12px;
}

.dark .n-tree-node-wrapper .placeholder {
  background-color: rgb(59, 59, 59, 1);
}

.dark .placeholder .n-tree-node-content__text {
  color: rgba(156, 163, 175, 0.5);
}
</style>
