import { createStore } from "vuex";
import { auth } from "./auth.module";
import { artistsModule } from "./artists.module";
import { albumsModule } from "./albums.module";

const store = createStore({
  modules: {
    auth,
    artistsModule,
    albumsModule,
  },
});

export default store;