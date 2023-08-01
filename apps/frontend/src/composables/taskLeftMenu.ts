import { ref } from 'vue'

const visible = ref(true)

export function useTaskLeftMenu() {
  function toggle() {
    visible.value = !visible.value
  }

  return { taskLeftMenuVisible: visible, toggleTaskLeftMenu: toggle }
}
