import AlbumsService from "@/services/albums.service.js";

const initialState = {
  albumsList: [],
  album: {},
  getAlbumsListStatus: false,
};

export const albumsModule = {
  namespaced: true,
  state: initialState,
  actions: {
    getAlbumsOfArtistAction({ commit }, artistId) {
      return AlbumsService.getAlbumsOfArtist(artistId).then(
        (response) => {
          commit("getAlbumsListSuccess", response);
          return Promise.resolve(response);
        },
        (error) => {
          commit("getAlbumsListFailure");
          return Promise.reject(error);
        }
      );
    },
},
mutations: {
    getAlbumsListSuccess(state, albums) {
      state.albumsList = albums.data;
      state.getAlbumsListStatus = true;
    },
    getAlbumsListFailure(state) {
        state.getAlbumsListStatus = false;
      },
},
getters: {
    getAlbums: (state) => {
      return state.albumsList;
    },
}
};