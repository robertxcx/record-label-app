import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import HomeView from "@/views/HomeView";
import AlbumsOfArtistView from '@/views/AlbumsOfArtistView.vue';
import AddArtistView from '@/views/AddArtistView.vue';
import EditArtistView from '@/views/EditArtistView.vue';
import AddAlbumView from '@/views/AddAlbumView.vue';
import EditAlbumView from '@/views/EditAlbumView.vue';
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
      {
        path: "/addArtistView",
        name: "addArtistView",
        component: AddArtistView,
      },
      {
        path: "/editArtistView/:artistId",
        name: "editArtistView",
        component: EditArtistView,
      },
    {
      path: "/addAlbumView/:artistId",
      name: "addAlbumView",
      component: AddAlbumView,
    },
    {
      path: "/editAlbumView/:albumId/artist/:artistId",
      name: "editAlbumView",
      component: EditAlbumView,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;