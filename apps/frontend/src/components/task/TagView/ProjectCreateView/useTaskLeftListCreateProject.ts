import type { FormRules } from 'naive-ui'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { useListProjectsStore } from '@/store'

enum SkinStone {
  NEUTRAL = 'neutral',
  LIGHT = '1f3fc',
  LIGHTER = '1f3fb',
  Medium = '1f3fd',
  MediumDark = '1f3fe',
  Deeper = '1f3ff',
}

interface EMoji {
  i: string
  n: string[]
  r: string // with skin tone
  t: SkinStone // skin tone
  u: string // without tone
}

export function useTaskLeftListCreateProject(
  inputElement: Ref<HTMLInputElement | undefined>,
) {
  const listProjectsStore = useListProjectsStore()
  const { handleMouseOver, handleMouseLeave, isHover } = useMouse()
  const { formValue, formRules } = useForm()
  const { cleanupInput, handleUpdateShow } = useInput()
  const isDuplicate = ref(false)
  const isSavable = computed(() => formValue.value.projectName?.trim() !== '' && !isDuplicate.value)
  const isShowPopover = ref<boolean>(false)
  const {
    getDefaultEmojiConfig,
    emojiValue,
    handleSelectEmoji,
  } = useEmoji()

  function useForm() {
    const formValue = ref({
      projectName: '',
    })
    const formRules: FormRules = {
      projectName: {
        validator: (_, value: string) => {
          return new Promise<void>((resolve, reject) => {
            isDuplicate.value = false
            if (!isSavable.value) {
              reject(Error('清单名称不能为空'))
            }
            else if (listProjectsStore.checkProjectIsExist(value)) {
              isDuplicate.value = true
              reject(Error('重复的清单名称'))
            }
            else { resolve() }
          })
        },
        trigger: ['input', 'blur'],
      },
    }
    return { formValue, formRules }
  }

  function useEmoji() {
    function getDefaultEmojiConfig() {
      const EMOJI_GROUPS_NAMES = {
        smileys_people: '人物',
        animals_nature: '动物 & 自然',
        food_drink: '食物 & 饮品',
        activities: '活动',
        travel_places: '旅行 & 地点',
        objects: '物体',
        symbols: '符号',
        flags: '旗帜',
      }

      const EMOJI_STATIC_TEXTS = { placeholder: '搜索', skinTone: '肤色' }
      return {
        EMOJI_STATIC_TEXTS,
        EMOJI_GROUPS_NAMES,
      }
    }

    const emojiValue = ref()
    function handleSelectEmoji(emoji: EMoji) {
      emojiValue.value = emoji.i
      isShowPopover.value = false
      inputElement.value?.focus()
    }
    return {
      getDefaultEmojiConfig,
      emojiValue,
      handleSelectEmoji,
    }
  }
  function useMouse() {
    const isHover = ref(false)
    function handleMouseOver() {
      isHover.value = true
    }
    function handleMouseLeave() {
      return (
        !isShowPopover.value && !emojiValue.value && (isHover.value = false)
      )
    }
    return { handleMouseOver, handleMouseLeave, isHover }
  }

  function useInput() {
    function cleanupInput() {
      formValue.value.projectName = ''
      emojiValue.value = null
    }
    function handleUpdateShow(show: boolean) {
      isShowPopover.value = show
      !show && inputElement.value?.focus()
    }
    return {
      cleanupInput,
      handleUpdateShow,
    }
  }

  return {
    cleanupInput,
    getDefaultEmojiConfig,
    handleSelectEmoji,
    emojiValue,
    formRules,
    formValue,
    handleMouseLeave,
    handleMouseOver,
    handleUpdateShow,
    isHover,
    isSavable,
    isShowPopover,
  }
}
