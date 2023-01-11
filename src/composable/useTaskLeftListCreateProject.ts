import { Icon } from '@iconify/vue'
import type { FormRules, TreeOption } from 'naive-ui'
import { NButton } from 'naive-ui'
import type { Ref } from 'vue'
import { computed, h, ref, toRaw, withModifiers } from 'vue'

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
  const {
    EMOJI_GROUPS_NAMES,
    EMOJI_STATIC_TEXTS,
    emojiValue,
    handleSelectEmoji,
  } = useEmoji()
  const { handleMouseOver, handleMouseLeave, isHover } = useMouse()
  const { formValue, formRules } = useForm()
  const { cleanupInput, handleUpdateShow, handleClose } = useInput()
  const isSavable = computed(() => formValue.value.projectName?.trim() !== '')
  const isShowPopover = ref(false)
  const isShowModal = ref(false)

  function useForm() {
    const formValue = ref({
      projectName: '',
    })
    const formRules: FormRules = {
      projectName: {
        validator: () => isSavable.value,
        message: '清单名称不能为空',
        trigger: ['input', 'blur'],
      },
    }
    return { formValue, formRules }
  }

  function useEmoji() {
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
    const emojiValue = ref()
    function handleSelectEmoji(emoji: EMoji) {
      emojiValue.value = emoji.i
      isShowPopover.value = false
      inputElement.value?.focus()
    }
    return {
      EMOJI_GROUPS_NAMES,
      EMOJI_STATIC_TEXTS,
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
    function handleClose() {
      isShowModal.value = false
      cleanupInput()
    }
    return {
      cleanupInput,
      handleUpdateShow,
      handleClose,
    }
  }

  function handleProjectButtonClick() {
    isShowModal.value = true
  }

  function renderCreateProjectButton({ option }: { option: TreeOption }) {
    const optionRaw = toRaw(option)
    if (optionRaw.isLeaf || optionRaw.isLeaf === undefined || optionRaw.label === '标签')
      return

    return h(
      NButton,
      {
        size: 'small',
        type: 'tertiary',
        onClick: withModifiers(handleProjectButtonClick, ['stop']),
      },
      {
        default: () =>
          h(Icon, {
            icon: 'ic:baseline-plus',
          }),
      },
    )
  }

  return {
    cleanupInput,
    EMOJI_GROUPS_NAMES,
    EMOJI_STATIC_TEXTS,
    emojiValue,
    formRules,
    formValue,
    handleClose,
    handleMouseLeave,
    handleMouseOver,
    handleSelectEmoji,
    handleUpdateShow,
    isHover,
    isSavable,
    isShowModal,
    isShowPopover,
    renderCreateProjectButton,
  }
}
