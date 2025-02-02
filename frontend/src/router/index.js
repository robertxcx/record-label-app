import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import HomeView from "@/views/HomeView";
import AlbumsOfArtistView from '@/views/AlbumsOfArtistView.vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
      },
    {
        path: "/register",
        name: "register",
        component: RegisterView,
      },
      {
        path: "/login",
        name: "login",
        component: LoginView,
      },
      {
        path: "/albumsofArtistView/:artistId",
        name: "albumsOfArtistView",
        component: AlbumsOfArtistView,
      },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;