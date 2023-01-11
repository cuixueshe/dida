<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  zIndex: 100,
  closeByMask: true,
  useVIf: true,
})

const emit = defineEmits<{
  (event: 'close'): void
}>()

defineOptions({
  inheritAttrs: false,
})

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

// https://vue-macros.sxzz.moe/macros/define-model.html
const { modelValue: visible } = defineModel<{
  /** v-model dialog visibility */
  modelValue: boolean
}>()

const closeModal = () => {
  visible.value = false
  emit('close')
}

const clickMask = () => {
  if (!props.closeByMask)
    return
  closeModal()
}

const bindTypeToAny = ($attrs: any) => $attrs as any
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-visible">
      <div v-if="useVIf" :style="{ zIndex }" class="fixed inset-0 of-y-auto scrollbar-hide overscroll-none">
        <!-- Mask layer: blur -->
        <div class="dialog-mask absolute inset-0 z-0 bg-transparent opacity-100 backdrop-filter backdrop-blur-sm touch-none " />
        <!-- Mask layer: dimming -->
        <div
          class="dialog-mask absolute inset-0 z-0 bg-black opacity-48 touch-none h-[calc(100%+0.5px)]"
          @click="clickMask"
        />
        <!-- Dialog container -->
        <div class="p-safe-area absolute inset-0 z-1 pointer-events-none opacity-100 flex">
          <div class="flex-1 flex items-center justify-center p-4">
            <!-- bindTypeToAny make sure will replace slot style -->
            <div
              ref="elDialogMain"
              class="dialog-main rounded shadow-lg pointer-events-auto isolate bg-base border-base border-1px border-solid w-full max-h-full of-y-auto overscroll-contain touch-pan-y touch-pan-x"
              v-bind="bindTypeToAny($attrs)"
            >
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
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
