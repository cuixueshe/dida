<script setup lang="ts">
import { ref } from 'vue'
import { NTree } from 'naive-ui'
import { useTaskStore } from '@/store/task'

const props = defineProps<{ selectedKey: number[]; listDefaultSelectedKey: number[] }>()

const emit = defineEmits(['getCurrentInventory'])

const taskStore = useTaskStore()

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
      const projectName = treeOption.option.label
      taskStore.changeCurrentActiveProject(projectName)
    },
  }
}
const changeSelectedKey = (key: number[]) => {
  emit('getCurrentInventory', key)
}
</script>

<template>
  <NTree
    :selected-keys="selectedKey" :default-expanded-keys="listDefaultSelectedKey" block-line :data="data"
    :node-props="nodeProps" @update:selected-keys="changeSelectedKey"
  />
</template>

<style scoped>

</style>
