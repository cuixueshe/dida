<script setup lang="ts">
import { NEmpty, NInput, NSkeleton } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { watchDebounced } from '@vueuse/core'
import Search from './search/Search.vue'
import Commands from './commands/Commands.vue'

const compRef = ref<InstanceType<typeof Search | typeof Commands>>()

const searchWord = ref('')
const loading = ref(false)
const isReset = ref(true)

const ComponentsAndSearchHandles = {
  search: [Search, async (v: string) => {
    const str = v.trim()
    if (!str)
      return
    loading.value = true
    await compRef.value!.handleSearch(str)
    await new Promise(resolve => setTimeout(resolve, 700))
    loading.value = false
  }],
  commands: [Commands, async (v: string) => {
    const str = v.slice(1).trim()
    if (!str)
      return
    await compRef.value!.handleSearch(v)
  }],
} as const

const showComponentAndHandle = computed(() => searchWord.value.startsWith('>') ? ComponentsAndSearchHandles.commands : ComponentsAndSearchHandles.search)

watchDebounced(() => searchWord.value, async (v) => {
  if (v) {
    if (isReset.value)
      isReset.value = false
    await showComponentAndHandle.value[1](v)
  }
}, { debounce: 500 })

watch(() => searchWord.value, (v) => {
  if (v === '') {
    isReset.value = true
    compRef.value?.clear()
  }
})

defineExpose({
  reset() {
    searchWord.value = ''
    isReset.value = true
  },
})
</script>

<template>
  <div class="base-color w-200 h-120 rounded p-sm">
    <NInput v-model:value="searchWord" placeholder="通过关键字搜索，或添加 '>' 前缀开启命令模式" clearable />
    <div class="mt-6">
      <NEmpty v-show="isReset" description="搜索任务，标签或查看命令。">
        <template #icon />
      </NEmpty>
      <div v-show="!isReset">
        <!-- Skeleton -->
        <div v-if="loading">
          <NSkeleton text :repeat="2" />
          <NSkeleton text style="width: 60%" />
        </div>
        <component :is="showComponentAndHandle[0]" v-else ref="compRef" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
