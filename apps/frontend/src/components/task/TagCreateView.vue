<script lang="ts" setup>
import { computed, defineEmits, nextTick, ref } from 'vue'
import type { FormInst } from 'naive-ui'
import {
  NButton,
  NColorPicker,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSelect,
  NSpace,
} from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useProjectSelectedStatusStore, useTaskStore } from '@/store'
interface TProps {
  show: boolean
}
interface TFormModel {
  name: string
  color: string
  parentTagId: number | undefined
}
const props = defineProps<TProps>()
const emits = defineEmits(['update:show'])
const taskStore = useTaskStore()
const formRef = ref<FormInst | null>(null)
const projectSelectedStatusStore = useProjectSelectedStatusStore()
const generateRandomColor = () => {
  return `#${(`00000${(Math.random() * 0x1000000 << 0).toString(16)}`).slice(-6)}`
}
const visible = computed({
  get() {
    return props.show
  },
  set(val) {
    emits('update:show', val)
  },
})

const nullOption = [{
  label: '',
  value: -1,
}]
const parentTagOptions = computed(() => {
  return nullOption.concat(taskStore.listTags.map(tag => ({
    label: tag.name,
    value: tag.id,
  })))
})

const initModel = {
  name: '',
  color: generateRandomColor(),
  parentTagId: -1,
}

const model = ref<TFormModel>(initModel)
const handleAdd = () => {
  formRef.value?.validate(async (error) => {
    if (error)
      return
    const modelVal = Object.assign(model.value, {})
    modelVal.parentTagId === -1 && (modelVal.parentTagId = undefined)
    await taskStore.addTag(modelVal)
    nextTick(() => {
      model.value = initModel
      projectSelectedStatusStore.listDefaultSelectedKey.push(200)
      projectSelectedStatusStore.changeSelectedKey([200 + taskStore.listTags.length - 1])
      visible.value = false
    })
  })
}
</script>

<template>
  <NModal v-model:show="visible" preset="dialog" :show-icon="false" title="创建标签">
    <NForm ref="formRef" :model="model" label-placement="left" class="pt-4">
      <NFormItem path="name" label="">
        <NInput v-model:value="model.name" size="large" placeholder="名称" @keydown.enter.prevent />
      </NFormItem>
      <NFormItem path="color" label="颜色">
        <NColorPicker v-model:value="model.color" style="width: 34px" :show-alpha="false">
          <template #label />
        </NColorPicker>
      </NFormItem>
      <NFormItem
        path="parentId"
        label="父标签"
      >
        <NSelect
          v-model:value="model.parentTagId"
          :options="parentTagOptions"
        />
      </NFormItem>
      <NSpace justify="end">
        <NButton attr-type="button" @click="visible = false">
          关闭
        </NButton>
        <NButton type="info" attr-type="button" :disabled="!model.name" @click="handleAdd">
          保存
        </NButton>
      </NSpace>
    </NForm>
  </NModal>
</template>
