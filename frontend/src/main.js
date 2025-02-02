import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router';
import axios from "axios";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMinus,
  faTrash,
  faCheck,
  faUserPlus,
  faLockOpen,
  faPen,
  faGamepad,
  faTrophy,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faPlus,
  faMinus,
  faTrash,
  faCheck,
  faUserPlus,
  faLockOpen,
  faPen,
  faGamepad,
  faTrophy,
  faRightFromBracket
);

createApp(App).use(router).use(store).mount("#app");
axios.defaults.baseURL = "http://localhost:8004/";