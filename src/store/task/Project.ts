import { Task } from "./Task";
export class Project {
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
