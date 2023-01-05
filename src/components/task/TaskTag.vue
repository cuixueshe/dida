<script setup lang="ts">
import { h, ref } from 'vue'
import type { TreeOption } from 'naive-ui'
import { NIcon, NTree } from 'naive-ui'
import { Tag } from '@vicons/carbon'
import { SpecialProjectNames, useTaskStore } from '@/store/task'

const props = defineProps<{ selectedKey: number[]; listDefaultSelectedKey: number[] }>()

const emit = defineEmits(['getCurrentTag'])

const taskStore = useTaskStore()

const selected = 'bg-[#E7F5EE] dark:bg-[#233633]'

const data = ref<any[]>([
  {
    key: 200,
    label: '学习',
  },
  {
    key: 201,
    label: '教研',
  },
  {
    key: 202,
    label: 'Element3',
  },
  {
    key: 203,
    label: 'live',
  },
  {
    key: 204,
    label: 'work',
  },
  {
    key: 205,
    label: '紧急',
  },
  {
    key: 206,
    label: '重要',
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

const renderPrefix = ({ option }: { option: TreeOption }) => {
  if (!option.isLeaf)
    return null

  return h(
    NIcon,
    { component: Tag },
  )
}

const changeSelectedKey = (key: number[]) => {
  emit('getCurrentTag', key)
}
</script>

<template>
  <div>
    <p pl-4 pr-2>
      标签
    </p>
    <ul>
      <li
        v-for=" item in data" :key="item.key" pl-8 pr-2 my-2 li_common justify-start
        hover="bg-[#F3F3F5] dark:bg-[#2D2D30]" :class="
          selectedKey[0] === item.key ? selected : ''" @click="changeSelectedKey(item.key)"
      >
        <NIcon mr-2>
          <Tag />
        </NIcon>
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
