// 这个文件是纯数据层  
import { fetchData } from "./data";
import { Project } from "./Project";
import { Task } from "./Task";
import { TaskState } from "./const";

// 1. 先请求后端接口获取数据  这里暂时使用 fetchData 来模拟后端返回的数据
// 2. 基于数据构建 model 层
export const projectList: Project[] = [];

// 完成的任务列表
export const completedProject = new Project("已完成");
// 删除的任务列表
export const trashProject = new Project("垃圾桶");

// 基于后端返回的数据做初始化
fetchData.projectList.forEach((projectListData) => {
  const project = new Project(projectListData.name);
  projectListData.taskList.forEach(({ title, content, state }) => {
    // 一个任务只能属于一个 project
    // 所以我们在构建的时候就需要区分出来 当前的 task 应该属于哪个 project
    const task = new Task(title, content, project);
    if (state === TaskState.ACTIVE) {
      task.addToProject(project);
    } else if (state === TaskState.COMPLETED) {
      task.previousState = TaskState.ACTIVE;
      task.setState(TaskState.COMPLETED);

      task.addToProject(completedProject);
    }
  });

  projectList.push(project);
});

fetchData.trash.taskList.forEach(({ title, content }) => {
  const task = new Task(title, content, trashProject);
  task.setState(TaskState.REMOVED);
  trashProject.addTask(task);
});