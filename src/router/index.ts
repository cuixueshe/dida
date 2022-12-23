import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Task from "../pages/Task.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  // { path: "/", component: Home, name: "Home" },
  { path: "/", redirect: "/task" },
  { path: "/about", component: About, name: "About" },
  { path: "/task", component: Task, name: "Task" },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
