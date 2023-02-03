<script setup lang="ts">
import { computed } from 'vue'
import {
  NButton,
  NModal,
  NSpace,
} from 'naive-ui'

interface TProps {
  show: boolean
  tagName: string
}

type Actions = 'update:show' | 'close' | 'cancel' | 'closed' | 'confirm'

const props = defineProps<TProps>()
const emits = defineEmits(['update:show', 'close', 'closed', 'cancel', 'confirm'])

const visible = computed({
  get() {
    return props.show
  },
  set(val) {
    emits('update:show', val)
  },
})

const handleActions = (action: Actions) => {
  emits(action)
  visible.value = false
  emits('closed')
}
</script>

<template>
  <NModal v-model:show="visible" preset="dialog" :show-icon="false" title="删除标签" @close="handleActions('close')">
    <div flex flex-col>
      <div my-4>
        删除后，标签 <span>{{ $props.tagName }}</span> 将会从任务中移除
      </div>
      <NSpace justify="end">
        <NButton attr-type="button" @click="handleActions('cancel')">
          取消
        </NButton>
        <NButton type="info" attr-type="button" @click="handleActions('confirm')">
          删除
        </NButton>
      </NSpace>
    </div>
  </NModal>
</template>
