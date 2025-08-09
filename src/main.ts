import { createApp } from "vue";
import App from "./App.vue";
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import AddForm from "./components/AddForm.vue";
import TodoItem from "./components/TodoItem.vue";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.component("todo-item", TodoItem);
app.component("add-form", AddForm);

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
};

app.use(Toast, options);

app.mount("#app");
