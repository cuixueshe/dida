<template>
  <div>
    <div>
      <n-tree
        block-line
        :data="data"
        :default-expanded-keys="[1]"
        :node-props="nodeProps"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NTree } from "naive-ui";
import { useTaskStore } from "../../store";

const taskStore = useTaskStore();

const data = ref<any[]>([
  {
    key: 1,
    label: "清单",
    checkboxDisabled: false,
    isLeaf: false,
    children: taskStore.projectList.map((project, index) => {
      return {
        key: 2 + index,
        label: project.name,
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
</script>

<style scoped></style>
