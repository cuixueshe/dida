<template>
  <div>
    <div>
      <n-tree
        block-line
        :data="data"
        :default-expanded-keys="[1]"
	:default-selected-keys="[2]"
        :node-props="nodeProps"
      />
    </div>
    <div>
      <ul>
        <li @click="handleShowCompletedProject">已完成</li>
        <li @click="handleShowTrashProject">垃圾桶</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NTree } from "naive-ui";
import { useTaskStore } from "../../store/task";

const taskStore = useTaskStore();

const data = ref<any[]>([
  {
    key: 1,
    label: "清单",
    checkboxDisabled: false,
    isLeaf: false,
    children: taskStore.projectNames.map((projectName, index) => {
      return {
        key: 2 + index,
        label: projectName,
        isLeaf: true,
      };
    }),
  },
]);

const nodeProps = (treeOption: any) => {
  return {
    onClick() {
      const projectName = treeOption.option.label;
      taskStore.changeCurrentActiveProject(projectName);
    },
  };
};


function handleShowCompletedProject () {
  taskStore.changeCurrentActiveProject("已完成")
}

function handleShowTrashProject () {
  taskStore.changeCurrentActiveProject("垃圾桶")
}
</script>

<style scoped></style>
