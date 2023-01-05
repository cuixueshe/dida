<script setup lang="ts">
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { SpecialProjectNames, useTaskStore } from '@/store/task'
const props = defineProps<{ selectedKey: number[] }>()
const emit = defineEmits(['getOtherKey'])
const taskStore = useTaskStore()
interface TaskListType {
  key: number
  icon: string
  title: `${SpecialProjectNames}`
}

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
  emit('getOtherKey', [key])
}
</script>

<template>
  <div class="mt-2px">
    <ul>
      <li
        v-for="item in taskList" :key="item.key" li_common pl-4 pr-2 hover="bg-[#F3F3F5] dark:bg-[#2D2D30]" :class="
          selectedKey[0] === item.key ? selected : ''
        " @click="
          changeSelectedKeyAndActiveProject(
            item.title,
            item.key,
          )
        "
      >
        <div flex>
          <Icon :icon="item.icon" width="20" class="color-[#9D9FA3]" dark="color-white-b" />
          <span class="ml-2">{{ item.title }}</span>
        </div>

        <Icon
          v-show="selectedKey[0] === item.key" icon="material-symbols:more-horiz" width="20" class="color-[#9D9FA3]"
          dark="color-white"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
