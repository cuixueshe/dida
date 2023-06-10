<script setup lang="ts">
import { filteredCommands } from './searchCommands'
import { closeCommandModal } from './commandModal'
import { useGoto } from '@/composables'

const goto = useGoto()

const handleClick = (cb: Function) => {
  closeCommandModal()
  cb(goto)
}
</script>

<template>
  <div>
    <div v-for="item in filteredCommands" :key="item.id" class="hover:bg-gray-400/5 leading-30px px-2 cursor-pointer" @click="handleClick(item.execute)">
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped></style>
