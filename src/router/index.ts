import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import { createRouter, createWebHashHistory } from "vue-router";


export const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/about", component: About, name: "About" },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
