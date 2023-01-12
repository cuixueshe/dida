<script setup lang="ts">
import { NEmpty, NInput, NSkeleton } from 'naive-ui'
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import Search from './search/Search.vue'

const searchRef = ref<InstanceType<typeof Search>>()

const searchWord = ref('')
const loading = ref(false)
const isReset = ref(true)

watchDebounced(() => searchWord.value, async (v) => {
  if (v) {
    if (isReset.value)
      isReset.value = false
    // fake loading
    loading.value = true
    await searchRef.value!.handleSearch(v)
    await new Promise(resolve => setTimeout(resolve, 700))
    loading.value = false
  }
  else {
    isReset.value = true
  }
}, { debounce: 500 })

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
        <Search v-else ref="searchRef" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
