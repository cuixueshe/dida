import ContextMenu from "@imengyu/vue3-context-menu";
import { useTaskStore } from "../store/task";

export function useTaskRightContextMenu() {
  const taskStore = useTaskStore();
  function showContextMenu(e: MouseEvent) {
    e.preventDefault();
    ContextMenu.showContextMenu({
      x: e.x,
      y: e.y,
      items: [
        {
          label: "remove",
          onClick: () => {
            taskStore.removeCurrentActiveTask();
          },
        },
      ],
    });
  }

  return {
    showContextMenu,
  };
}
