<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
interface Props {
  /**
   * level of depth
   * @default 100
   */
  zIndex?: number
  /**
   * will close if click mask
   * @default true
   */
  closeByMask?: boolean
  /**
   * use if will destroy when close
   * @default true
   */
  useVIf?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  zIndex: 100,
  closeByMask: true,
  useVIf: true,
})

const emits = defineEmits<{
  (event: 'close'): void
}>()

// https://vue-macros.sxzz.moe/macros/define-model.html
defineModel()

const closeModal = () => {

}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-visible" />
  </Teleport>
</template>

<style scoped lang="postcss">
.dialog-visible-enter-active,
.dialog-visible-leave-active {
  transition-duration: 0.25s;

  .dialog-mask {
    transition: opacity 0.25s ease;
  }

  .dialog-main {
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
}

.dialog-visible-enter-from,
.dialog-visible-leave-to {
  .dialog-mask {
    opacity: 0;
  }

  .dialog-main {
    transform: translateY(50px);
    opacity: 0;
  }
}

.p-safe-area {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}
</style>
