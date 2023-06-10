<script setup lang="ts">
import { computed } from 'vue'
import Selected from './Selected.vue'
import { useThemeStore } from '@/store'
import type { Theme } from '@/composables/settings'

const props = defineProps<{
  color: string
  name: string
  label: string
}>()

const store = useThemeStore()

const checked = computed(() => store.currentTheme?.name === props.name)

const changeTheme = () => {
  if (checked.value)
    return

  // 这里转换是因为目前 defineProps 仍然不支持 import type
  store.changeTheme(props.name as Theme)
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-12px">
    <div
      class="w-60px h-60px rounded-5px cursor-pointer flex justify-center items-center"
      :style="{ background: color }"
      @click="changeTheme"
    >
      <Selected v-if="checked" />
    </div>
    <div class="text-12px">
      {{ label }}
    </div>
  </div>
</template>

<style scoped></style>
