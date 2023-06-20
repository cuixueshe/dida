<script setup lang="ts">
import { useSearchCommands } from './searchCommands'
import { useCommandModal } from './commandModal'
import type { Command } from '@/composables/command'

const { closeCommandModal } = useCommandModal()
const { filteredCommands } = useSearchCommands()

const handleClick = (command: Command) => {
  command.execute()
  closeCommandModal()
}
</script>

<template>
  <div>
    <div v-for="(item, key) in filteredCommands" :key="key" class="hover:bg-gray-400/5 leading-30px px-2 cursor-pointer" @click="handleClick(item)">
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped></style>
