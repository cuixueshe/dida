<script setup lang="ts">
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import { useCommandStore } from '@/store'

const commandStore = useCommandStore()

const router = useRouter()

const closeModal = inject('closeModal') as () => void

const handleClick = (cb: Function) => {
  closeModal()
  cb(router)
}

defineExpose({
  handleSearch(input: string) {
    commandStore.handleSearch(input)
  },
  clear() {
    commandStore.reset()
  },
})
</script>

<template>
  <div>
    <div v-for="item in commandStore.searchCommands" :key="item.id" class="hover:bg-gray-400/5 leading-30px px-2 cursor-pointer" @click="handleClick(item.handler)">
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped></style>
