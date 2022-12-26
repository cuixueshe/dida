import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export class Task {
  title: string;
  content: string;
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

class Project {
  name: string;
  taskList: Task[];
  constructor(name: string) {
    this.taskList = [];
    this.name = name;
  }

  addTask(task: Task) {
    this.taskList.push(task);
  }

  removeTask(task: Task) {
    console.log("remove task");
    const index = this.taskList.indexOf(task);
    if (index !== -1) {
      this.taskList.splice(index, 1);
    }
  }
}



// 模拟的后端数据
const data = {
  projectList: [
    {
      name: "快捷",
      taskList: [
        {
          title: "吃饭",
          content: "## 吃饭 \n 吃什么好呢",
        },
        {
          title: "睡觉",
          content: "## 睡觉 \n 早睡早起 身体好",
        },
        {
          title: "写代码",
          content: "## 写代码 \n 日常写码2个点",
        },
      ],
    },
    {
      name: "集草器",
      taskList: [
        {
          title: "哈哈哈",
          content: "hahaha",
        },
        {
          title: "嘿嘿嘿",
          content: "heiheihei",
        },
      ],
    },
  ],
};

// ProjectList -> Project -> Task
export const useTaskStore = defineStore("task", () => {
  const currentActiveTask = ref<Task | null>();
  const projectList = reactive<Project[]>([]);
  const currentActiveProject = ref<Project>();

  // 把后端给的数据做转化
  data.projectList.forEach((projectListData) => {
    const project = new Project(projectListData.name);
    projectListData.taskList.forEach(({ title, content }) => {
      project.taskList.push(new Task(title, content));
    });

    projectList.push(project);
  });

  // 取第一个 project 作为当前显示的
  currentActiveProject.value = projectList[0];

  function changeActiveTask(task: Task | null) {
    currentActiveTask.value = task;
  }

  function addTask(title: string) {
    const task = new Task(title, "");
    currentActiveProject.value?.addTask(task);

    changeActiveTask(task);
  }

  function removeCurrentActiveTask() {
    if (currentActiveTask.value) {
      currentActiveProject.value?.removeTask(currentActiveTask.value);

      changeActiveTask(null);
    }
  }

  function changeCurrentActiveProject(projectName: string) {
    const project = projectList.find((project) => {
      return project.name === projectName;
    });
    if (project) {
      currentActiveProject.value = project;
    }

    changeActiveTask(null)
  }

  return {
    currentActiveTask,
    currentActiveProject,
    projectList,

    addTask,
    removeCurrentActiveTask,
    changeActiveTask,

    changeCurrentActiveProject
  };
});
