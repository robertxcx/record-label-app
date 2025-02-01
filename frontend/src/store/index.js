import { createStore } from "vuex";
import { auth } from "./auth.module";
import { artistsModule } from "./artists.module";
import { albumsModule } from "./albums.module";

import createPersistedState from 'vuex-persistedstate';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const store = createStore({
    state: {
        isDarkMode: isDark, 
      },
      mutations: {
        TOGGLE_DARK_MODE(state) {
          state.isDarkMode = !state.isDarkMode;
          toggleDark();
        },
      },
      actions: {
        toggleDarkMode({ commit }) {
          commit('TOGGLE_DARK_MODE');
        },
      },
  modules: {
    auth,
    artistsModule,
    albumsModule,
  },
  plugins: [createPersistedState()],
});

export default store;