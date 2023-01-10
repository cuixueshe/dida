<script setup lang="tsx">
import { Icon } from '@iconify/vue'
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NPopover,
  NTree,
} from 'naive-ui'
import { ref } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import { useProjectSelectedStatusStore, useTaskStore } from '@/store'
import { useTaskLeftListCreateProject } from '@/composable'
import 'vue3-emoji-picker/css'

const projectSelectedStatusStore = useProjectSelectedStatusStore()
const taskStore = useTaskStore()

const data = ref<any[]>([
  {
    key: 100,
    label: '清单',
    checkboxDisabled: false,
    isLeaf: false,
    children: taskStore.projectNames.map((projectName, index) => {
      return {
        key: 100 + index + 1,
        label: projectName,
        isLeaf: true,
      }
    }),
  },
])
const nodeProps = (treeOption: any) => {
  return {
    onClick() {
      const projectName = treeOption.option.label
      taskStore.changeCurrentActiveProject(projectName)
    },
  }
}

const inputElement = ref<HTMLInputElement>()
const {
  EMOJI_GROUPS_NAMES,
  EMOJI_STATIC_TEXTS,
  emojiValue,
  formRules,
  formValue,
  handleCannel,
  handleMouseLeave,
  handleMouseOver,
  handleSelectEmoji,
  handleUpdateShow,
  isHover,
  isSavable,
  isShowModal,
  isShowPopover,
  renderCreateProjectButton,
  cleanupInput,
} = useTaskLeftListCreateProject(inputElement)

function handleSave() {
  // @todo add project
  cleanupInput()
}

function changeSelectedKey(key: number[]) {
  projectSelectedStatusStore.changeSelectedKey(key)
}
</script>

<template>
  <NTree
    v-model:selected-keys="projectSelectedStatusStore.selectedKey"
    block-line
    expand-on-click
    :default-expanded-keys="projectSelectedStatusStore.listDefaultSelectedKey"
    :render-suffix="renderCreateProjectButton"
    :data="data"
    :node-props="nodeProps"
    @update:selected-keys="changeSelectedKey"
  />
  <NModal v-model:show="isShowModal" transform-origin="center" :mask-closable="!isSavable" @esc="cleanupInput">
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
        <div class="flex justify-end">
          <NButton class="mr-3" @click="handleCannel">
            关闭
          </NButton>
          <NButton type="success" :disabled="!isSavable" @click="handleSave">
            保存
          </NButton>
        </div>
      </template>
    </NCard>
  </NModal>
</template>

<style>
.n-tree.n-tree--block-line
  .n-tree-node:not(.n-tree-node--disabled).n-tree-node--pending {
  background-color: transparent;
}
.n-tree.n-tree--block-line
  .n-tree-node:not(.n-tree-node--disabled).n-tree-node--selected {
  background-color: var(--n-node-color-active);
}
</style>
