<script lang="ts" setup>
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
import { computed, defineEmits, ref } from 'vue'
import { Icon } from '@iconify/vue'
interface TProps {
  show: boolean
}
interface TFormModel {
  name: string
  color: string
  parentId: string
}
const props = defineProps<TProps>()
const emits = defineEmits(['update:show'])
const formRef = ref<FormInst | null>(null)
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
// const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const model = ref<TFormModel>({
  name: '',
  color: generateRandomColor(),
  parentId: '',
})
const handleAdd = () => {
  formRef.value?.validate((error) => {
    if (!error)
      // eslint-disable-next-line no-console
      console.log(model.value)
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
          v-model:value="model.parentId"
          :options="[{
            label: '无',
            value: '',
          }]"
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
