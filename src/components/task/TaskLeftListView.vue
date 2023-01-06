<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NTree } from 'naive-ui'
import { Icon } from '@iconify/vue'
import type { Key } from 'naive-ui/es/cascader/src/interface'
import { SpecialProjectNames, useTaskStore } from '@/store'

interface TaskListType {
  key: number
  icon: string
  title: `${SpecialProjectNames}`
}

const taskStore = useTaskStore()

const selectedKey = ref([101])
const listDefaultSelectedKey = ref([100])

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

const selected = 'bg-[#E7F5EE] dark:bg-[#233633]'

const taskList = reactive<TaskListType[]>([
  {
    key: 1,
    icon: 'material-symbols:check-box',
    title: SpecialProjectNames.Complete,
  },
  {
    key: 2,
    icon: 'mdi:close-box',
    title: SpecialProjectNames.Failed,
  },
  {
    key: 3,
    icon: 'material-symbols:delete',
    title: SpecialProjectNames.Trash,
  },
  {
    key: 4,
    icon: 'material-symbols:text-snippet-rounded',
    title: SpecialProjectNames.Abstract,
  },
])

const changeSelectedKeyAndActiveProject = (
  projectName: string,
  key: number,
) => {
  taskStore.changeCurrentActiveProject(projectName)
  selectedKey.value = [key]
}

const nodeProps = (treeOption: any) => {
  return {
    onClick() {
      const projectName = treeOption.option.label
      taskStore.changeCurrentActiveProject(projectName)
    },
  }
}

const changeSelectedKey = (key: number[]) => {
  selectedKey.value = key
}
</script>

<template>
  <div>
    <div>
      <NTree
        v-model:selected-keys="selectedKey"
        :default-expanded-keys="listDefaultSelectedKey"
        block-line
        :data="data"
        :node-props="nodeProps"
        @update:selected-keys="changeSelectedKey"
      />
    </div>
    <div class="mt-2px">
      <ul>
        <li
          v-for="item in taskList"
          :key="item.key"
          li_common
          pl-4
          pr-2
          hover="bg-[#F3F3F5] dark:bg-[#2D2D30]"
          :class="
            selectedKey[0] === item.key ? selected : ''
          "
          @click="
            changeSelectedKeyAndActiveProject(
              item.title,
              item.key,
            )
          "
        >
          <div flex>
            <Icon
              :icon="item.icon"
              width="20"
              class="color-[#9D9FA3]"
              dark="color-white-b"
            />
            <span class="ml-2">{{ item.title }}</span>
          </div>

          <Icon
            v-show="selectedKey[0] === item.key"
            icon="material-symbols:more-horiz"
            width="20"
            class="color-[#9D9FA3]"
            dark="color-white"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
