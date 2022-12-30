<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NTree } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/store/task'
import { SpecialProjectNames } from '@/store/task/const'

interface TaskListType {
  key: string
  icon: string
  title: `${SpecialProjectNames}` 
}

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

const taskList = reactive<TaskListType[]>([
  {
    key: 'complete',
    icon: 'material-symbols:check-box',
    title: SpecialProjectNames.Complete,
  },
  {
    key: 'failed',
    icon: 'mdi:close-box',
    title: SpecialProjectNames.Failed,
  },
  {
    key: 'trash',
    icon: 'material-symbols:delete',
    title: SpecialProjectNames.Trash,
  },
  {
    key: 'abstract',
    icon: 'material-symbols:text-snippet-rounded',
    title: SpecialProjectNames.Abstract,
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
    <div class="mt-2px pl-6 pr-2">
      <ul>
        <li
          v-for="item in taskList"
          :key="item.key"
          cursor-pointer
          flex
          justify-between
          items-center
          h-8
          hover="bg-[#F6F8FF]"
          @click="
            taskStore.changeCurrentActiveProject(item.title)
          "
        >
          <div flex>
            <Icon
              :icon="item.icon"
              width="20"
              color="#9D9FA3"
            />
            <span class="ml-2">{{ item.title }}</span>
          </div>

          <Icon
            icon="material-symbols:more-horiz"
            color="#9D9FA3"
            width="20"
            class="isShow"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.isShow {
  display: none;
}
li:hover .isShow {
  display: block;
}
</style>
