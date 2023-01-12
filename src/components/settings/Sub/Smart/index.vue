<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NSelect } from 'naive-ui'
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()
</script>

<template>
  <ul p-8>
    <li
      v-for="(item, key) in settingsStore.settingsSmartProjects"
      :key="key"
      pl-4
      pr-2
      h-60px
      flex items-center
    >
      <div w-120px flex items-center>
        <Icon
          :icon="item.icon"
          width="20"
          class="color-[#9D9FA3]"
          dark="color-white-b"
        />
        <span>{{ item.title }}</span>
      </div>
      <div w-200px>
        <NSelect v-model:value="item.option" :options="item.options" />
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
