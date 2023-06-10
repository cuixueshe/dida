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
import { computed, ref } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import { useTaskLeftListCreateProject } from './useTaskLeftListCreateProject'
import { useListProjectsStore } from '@/store'
import 'vue3-emoji-picker/css'

const props = defineProps({
  show: { type: Boolean },
})
const emits = defineEmits(['update:show', 'close', 'closed', 'cancel', 'confirm'])
const inputElement = ref<HTMLInputElement>()
const projectsStore = useListProjectsStore()

const {
  cleanupInput,
  emojiValue,
  formRules,
  formValue,
  getDefaultEmojiConfig,
  handleMouseLeave,
  handleMouseOver,
  handleSelectEmoji,
  handleUpdateShow,
  isHover,
  isSavable,
  isShowPopover,
} = useTaskLeftListCreateProject(inputElement)

const { EMOJI_STATIC_TEXTS, EMOJI_GROUPS_NAMES } = getDefaultEmojiConfig()
type Actions = 'close' | 'cancel' | 'confirm'
const isShowModal = computed({
  get() {
    return props.show
  },
  set(val) {
    emits('update:show', val)
  },
})
const handleActions = (action: Actions) => {
  emits(action)
  cleanupInput()
  isShowModal.value = false
  emits('closed')
}

function handleSave() {
  let projectName = formValue.value.projectName
  emojiValue.value && (projectName = emojiValue.value + projectName)
  projectsStore.createProject(projectName)
  handleActions('confirm')
}
</script>

<template>
  <NModal
    v-model:show="isShowModal" transform-origin="center" :mask-closable="!isSavable" @esc="handleActions('close')"
    @close="handleActions('close')"
  >
    <NCard style="width: 600px" size="huge" role="dialog" aria-modal="true" :bordered="false">
      <template #header>
        <div class="flex font-bold justify-center">
          添加清单
        </div>
      </template>

      <div @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
        <NForm :model="formValue" :rules="formRules">
          <NFormItem path="projectName">
            <NInput ref="inputElement" v-model:value="formValue.projectName" placeholder="名称">
              <template #prefix>
                <NPopover
                  v-if="isHover" placement="bottom" trigger="click" :show="isShowPopover" :show-arrow="false"
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
                    picker-type="inputValue" :native="true" :static-texts="EMOJI_STATIC_TEXTS"
                    :group-names="EMOJI_GROUPS_NAMES" @select="handleSelectEmoji"
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
          <NButton @click="handleActions('cancel')">
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
