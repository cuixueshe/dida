<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { NTree, NPopover } from 'naive-ui'
import { Icon } from '@iconify/vue'
import type { Key } from 'naive-ui/es/cascader/src/interface'
import { SpecialProjectNames, useTaskStore } from '@/store/task'

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

const showMoreIconIndex = ref<number>(-1)
const showWitchPopover = ref<number>(-1)
// 通过修改此数组来展示或隐藏taskList里的某一项,以后在设置页面通过修改此数组来控制
const canShowTaskList = ref<number[]>([1, 2, 3, 4])

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

const openPopover = (key: number) => {
  showWitchPopover.value = key
}

const hideTaskItem = (key: number) => {
  if (canShowTaskList.value.includes(key)) {
    canShowTaskList.value = canShowTaskList.value.filter(
      (item) => item !== key,
    )
  }
  showWitchPopover.value = -1
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
          v-show="canShowTaskList.includes(item.key)"
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
          @mouseenter="showMoreIconIndex = item.key"
          @mouseleave="showMoreIconIndex = -1"
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
          
          <NPopover trigger="click" style="padding: 5px 0 5px 0" @clickoutside="showWitchPopover = -1" :show="showWitchPopover === item.key"
           :show-arrow="false" placement="bottom-start">
            <template #trigger>
              <Icon
                v-show="selectedKey[0] === item.key || showMoreIconIndex === item.key"
                icon="material-symbols:more-horiz"
                width="20"
                class="color-[#9D9FA3]"
                dark="color-white"
                @click="($event) => {$event.stopPropagation(); openPopover(item.key)}"
              />
            </template>
            <ul w-180px cursor-pointer>
              <li hover="bg-[#F3F3F5] dark:bg-[#2D2D30]" pl-4 text-14px h-20px lh-20px
              @click="hideTaskItem(item.key)">隐藏</li>
            </ul>
          </NPopover>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
