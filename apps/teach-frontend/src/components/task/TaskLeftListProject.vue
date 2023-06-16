<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { TreeOption } from 'naive-ui'
import { NTree } from 'naive-ui'
import { computed, h, ref, watchEffect } from 'vue'
import 'vue3-emoji-picker/css'
import { projectCreatedViewModal } from './TagView/ProjectCreateView'
import { useTaskLeftListStore } from './taskLeftList'

const taskLeftListStore = useTaskLeftListStore()
const treeListProjectChildren = ref<TreeOption[]>([])

const selectedKey = computed({
  get() {
    return [taskLeftListStore.selectedKey]
  },
  set(val) {
    taskLeftListStore.selectedKey = val[0]
  },
})

const defaultExpandedKeys = [taskLeftListStore.listProjectRootNode.name]

const createRootNodeSuffix = (onclick: (e: Event) => void) => {
  return () => h(Icon, {
    icon: 'ic:baseline-plus',
    width: '20',
    class: 'invisible rounded-1 hover:bg-gray-2',
    onclick,
  })
}

watchEffect(() => {
  treeListProjectChildren.value = taskLeftListStore.listProjectChildrenNodes.map((project) => {
    return {
      key: project.name,
      label: project.name,
      isleaf: true,
    }
  })
})

const data = ref<any[]>([
  {
    key: taskLeftListStore.listProjectRootNode.name,
    label: taskLeftListStore.listProjectRootNode.name,
    checkboxDisabled: false,
    isLeaf: false,
    children: treeListProjectChildren,
    suffix: createRootNodeSuffix((e: Event) => {
      e.stopPropagation()
      projectCreatedViewModal()
    }),
  },
])

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    class: option.placeholder ? 'placeholder' : '',
  }
}
</script>

<template>
  <NTree
    v-model:selected-keys="selectedKey" :default-expanded-keys="defaultExpandedKeys"
    block-line expand-on-click :data="data" :node-props="nodeProps"
  />
</template>

<style>
.n-tree.n-tree--block-line .n-tree-node:not(.n-tree-node--disabled).n-tree-node--pending {
  background-color: transparent;
}

.n-tree.n-tree--block-line .n-tree-node:not(.n-tree-node--disabled).n-tree-node--selected {
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

.n-tree.n-tree--block-line .n-tree-node:not(.n-tree-node--disabled):hover .iconify {
  visibility: visible;
}
</style>
