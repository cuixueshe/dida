import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { nanoid } from 'nanoid'

export enum TaskState {
  ACTIVE = 1,
  COMPLETED = 2,
  GIVE_UP = 3,
  REMOVED = 4,
}

export enum SpecialProjectNames {
  DONE = "已完成"
}

export class Task {
  public title: string;
  id: string 
  content: string;
  project: Project;
  state: TaskState = TaskState.ACTIVE;
  previousProject?: Project | null;
  previousState?: TaskState | null;
  constructor(title: string, content: string, project: Project, id?: string, state: number = TaskState.ACTIVE) {
    this.title = title;
    this.content = content;
    this.project = project;
    this.state = state
    this.id = nanoid()
  }

  setState(state: TaskState) {
    this.previousState = this.state;
    this.state = state;
  }

  addToProject(project: Project) {
    this.project.removeTask(this);

    this.previousProject = this.project;
    this.project = project;

    this.project.addTask(this);
  }

  restore() {
    if (this.previousProject) {
      this.state = this.previousState!;
      this.addToProject(this.previousProject);
      this.previousState = null
      this.previousProject = null
    }
  }

  getId() {
    return this.id
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
    this.taskList.unshift(task);
  }

  removeTask(task: Task) {
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
          state: 1,
          id: nanoid()
        },
        {
          title: "睡觉",
          content: "## 睡觉 \n 早睡早起 身体好",
          state: 1,
          id: nanoid()
        },
        {
          title: "写代码",
          content: "## 写代码 \n 日常写码2个点",
          state: 2,
          id: nanoid()
        },
      ],
    },
    {
      name: "集草器",
      taskList: [
        {
          title: "哈哈哈",
          content: "hahaha",
          state: 1,
          id: nanoid()
        },
        {
          title: "嘿嘿嘿",
          content: "heiheihei",
          state: 1,
          id: nanoid()
        },
      ],
    },
  ],
};

// 构建 Model 层
const projectList: Project[] = [];

// 完成的任务列表
const completedProject = new Project(SpecialProjectNames.DONE);

// 基于后端返回的数据做初始化
data.projectList.forEach((projectListData) => {
  const project = new Project(projectListData.name);
  projectListData.taskList.forEach(({ title, content, state, id }) => {
    // 一个任务只能属于一个 project
    // 所以我们在构建的时候就需要区分出来 当前的 task 应该属于哪个 project
    const task = new Task(title, content, project, id, state);
    if (state === TaskState.ACTIVE) {
      project.taskList.push(task);
    } else if (state === TaskState.COMPLETED) {
      completedProject.taskList.push(task);
    }
  });

  projectList.push(project);
});

export const useTaskStore = defineStore("task", () => {
  const currentActiveTask = ref<Task | null>();
  const currentActiveProject = ref<Project>();
  const projectNames = reactive<string[]>(["快捷", "集草器"]);

  // 取第一个 project 作为当前显示的
  currentActiveProject.value = projectList[0];

  function changeActiveTask(task: Task | null) {
    currentActiveTask.value = task;
  }

  function addTask(title: string) {
    if (currentActiveProject.value) {
      const task = new Task(title, "", currentActiveProject.value);
      currentActiveProject.value.addTask(task);
      changeActiveTask(task);
    }
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
    } else if (projectName === SpecialProjectNames.DONE) {
      currentActiveProject.value = completedProject;
    }

    changeActiveTask(null);
  }

  function setCurrentActiveTaskTitle(title: string) {
    if (currentActiveTask.value) {
      currentActiveTask.value.title = title;
    }
  }

  function completeTask(task: Task) {
    task.setState(TaskState.COMPLETED);
    task.addToProject(completedProject);
  }

  function restoreTask(task: Task) {
    task.restore();
  }

  function shouldShowTodoAdd() {
    return currentActiveProject.value?.name !== SpecialProjectNames.DONE;
  }

  return {
    currentActiveTask,
    currentActiveProject,
    projectNames,

    addTask,
    completeTask,
    restoreTask,
    removeCurrentActiveTask,
    changeActiveTask,

    changeCurrentActiveProject,
    setCurrentActiveTaskTitle,

    shouldShowTodoAdd
  };
});
