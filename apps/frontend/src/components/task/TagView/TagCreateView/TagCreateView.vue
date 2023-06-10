<!-- <script lang="ts" setup>
import { computed, defineEmits, nextTick, onMounted, ref } from 'vue'
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
import { useProjectSelectedStatusStore } from '@/store'
// import type { Tag } from '@/services/task/listTag'

interface TProps {
  show: boolean
  tag?: Omit<Tag, 'loadTasks'>
}

type Actions = 'close' | 'cancel' | 'confirm' | 'edited'
const props = defineProps<TProps>()
const emits = defineEmits(['update:show', 'close', 'closed', 'cancel', 'confirm', 'edited'])
interface TFormModel {
  name: string
  color: string
  parentTagId: number | undefined
}

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
// const parentTagOptions = computed(() => {
//   return nullOption.concat(taskStore.listTags.map(tag => ({
//     label: tag.name,
//     value: tag.id,
//   })))
// })

const initModel = () => ({
  name: '',
  color: generateRandomColor(),
  parentTagId: -1,
})

const model = ref<TFormModel>(initModel())

const handleActions = (action: Actions) => {
  emits(action)
  visible.value = false
  emits('closed')
}

const handleCreateTag = async () => {
  const modelVal = Object.assign(model.value, {})
  modelVal.parentTagId === -1 && (modelVal.parentTagId = undefined)
  // await taskStore.addTag(modelVal)
  nextTick(() => {
    model.value = initModel()
    projectSelectedStatusStore.listDefaultSelectedKey.push(200)
    // projectSelectedStatusStore.changeSelectedKey([200 + taskStore.listTags.length - 1])
    handleActions('confirm')
  })
}

const handleEditTag = () => {
  // taskStore.editTag({ ...model.value, id: props.tag!.id })
  handleActions('edited')
}

const handleConfirm = () => {
  formRef.value?.validate(async (error) => {
    if (error)
      return

    if (props.tag)
      handleEditTag()
    else
      handleCreateTag()
  })
}

onMounted(() => {
  if (props.tag) {
    const { name, color, parentTagId } = props.tag
    model.value = { name, color, parentTagId: parentTagId || undefined }
  }
})
</script>

<template>
  <NModal v-model:show="visible" preset="dialog" :show-icon="false" title="创建标签" @close="handleActions('close')">
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
        <NButton attr-type="button" @click="handleActions('cancel')">
          关闭
        </NButton>
        <NButton type="info" attr-type="button" :disabled="!model.name" @click="handleConfirm">
          保存
        </NButton>
      </NSpace>
    </NForm>
  </NModal>
</template> -->
