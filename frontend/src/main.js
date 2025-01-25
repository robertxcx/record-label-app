import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router';
import axios from "axios";

createApp(App).use(router).use(store).mount("#app");
axios.defaults.baseURL = "http://localhost:8004/";