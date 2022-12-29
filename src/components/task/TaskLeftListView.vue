<script setup lang="ts">
import { ref } from 'vue'
import { NTree } from 'naive-ui'
import { useTaskStore } from '@/store/task'
import { SpecialProjectNames } from '@/store/task/const'

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

function handleShowTrashProject() {
  taskStore.changeCurrentActiveProject(SpecialProjectNames.Trash)
}

function handleShowCompletedProject() {
  taskStore.changeCurrentActiveProject(SpecialProjectNames.Complete)
}
</script>

<template>
  <div>
    <div>
      <NTree
        block-line
        :data="data"
        :default-expanded-keys="[1]"
        :default-selected-keys="[2]"
        :node-props="nodeProps"
      />
    </div>
    <div class="mt-2px px-6">
      <ul>
        <li class="cursor-pointer" @click="handleShowCompletedProject">
          {{ SpecialProjectNames.Complete }}
        </li>
        <li class="cursor-pointer" @click="handleShowTrashProject">
          {{ SpecialProjectNames.Trash }}
        </li>
      </ul>
    </div>
  </div>
</template>
