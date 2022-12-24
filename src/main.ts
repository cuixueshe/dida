import "./style.css";
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(ContextMenu)

app.mount("#app");
