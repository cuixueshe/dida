<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NPopover,
  NSpace,
} from 'naive-ui'
import { ref } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import { useTaskStore } from '@/store'
import { useTaskLeftListCreateProject } from '@/composable'
import 'vue3-emoji-picker/css'

const inputElement = ref<HTMLInputElement>()
const taskStore = useTaskStore()

const {
  cleanupInput,
  emojiValue,
  formRules,
  formValue,
  getDefaultEmojiConfig,
  handleClose,
  handleMouseLeave,
  handleMouseOver,
  handleSelectEmoji,
  handleUpdateShow,
  isHover,
  isSavable,
  isShowModal,
  isShowPopover,
} = useTaskLeftListCreateProject(inputElement)

const { EMOJI_STATIC_TEXTS, EMOJI_GROUPS_NAMES } = getDefaultEmojiConfig()

function handleSave() {
  let projectName = formValue.value.projectName
  emojiValue.value && (projectName = emojiValue.value + projectName)
  taskStore.addProject(projectName)
  isShowModal.value = false
  cleanupInput()
}

function toggleShowModal() {
  isShowModal.value = true
}

defineExpose({
  toggleShowModal,
})
</script>

<template>
  <NModal
    v-model:show="isShowModal"
    transform-origin="center"
    :mask-closable="!isSavable"
    @esc="cleanupInput"
  >
    <NCard
      style="width: 600px"
      size="huge"
      role="dialog"
      aria-modal="true"
      :bordered="false"
    >
      <template #header>
        <div class="flex font-bold justify-center">
          添加清单
        </div>
      </template>

      <div @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
        <NForm :model="formValue" :rules="formRules">
          <NFormItem path="projectName">
            <NInput
              ref="inputElement"
              v-model:value="formValue.projectName"
              placeholder="名称"
            >
              <template #prefix>
                <NPopover
                  v-if="isHover"
                  placement="bottom"
                  trigger="click"
                  :show="isShowPopover"
                  :show-arrow="false"
                  @update:show="handleUpdateShow"
                >
                  <template #trigger>
                    <NButton text @click="isShowPopover = !isShowPopover">
                      <template #icon>
                        <span v-if="emojiValue">{{ emojiValue }}</span>
                        <Icon v-else icon="fa-solid:smile-wink" />
                      </template>
                    </NButton>
                  </template>
                  <EmojiPicker
                    picker-type="inputValue"
                    :native="true"
                    :static-texts="EMOJI_STATIC_TEXTS"
                    :group-names="EMOJI_GROUPS_NAMES"
                    @select="handleSelectEmoji"
                  />
                </NPopover>
                <NButton v-else text>
                  <template #icon>
                    <Icon icon="ic:outline-menu" />
                  </template>
                </NButton>
              </template>
            </NInput>
          </NFormItem>
        </NForm>
      </div>

      <template #footer>
        <NSpace justify="end">
          <NButton @click="handleClose">
            关闭
          </NButton>
          <NButton type="success" :disabled="!isSavable" @click="handleSave">
            保存
          </NButton>
        </NSpace>
      </template>
    </NCard>
  </NModal>
</template>
