import AlbumsService from "@/services/albums.service.js";

const initialState = {
  albumsList: [],
  album: {},
  getAlbumsListStatus: false,
  getAlbumStatus: false,
  addAlbumStatus: false,
  updateAlbumStatus: false,
  deleteAlbumStatus: false,
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
    getAlbumByIdAction({ commit }, albumId) {
      return AlbumsService.getAlbumById(albumId).then(
        (response) => {
          commit("getAlbumByIdSuccess", response);
          return Promise.resolve(response);
        },
        (error) => {
          commit("getAlbumByIdFailure");
          return Promise.reject(error);
        }
      );
    },
    addAlbumAction({ commit }, { albumToAdd, artistId }) {
      return AlbumsService.addAlbum(artistId, albumToAdd).then(
        async (response) => {
          const updatedAlbums = await AlbumsService.getAllAlbums();

          commit("addAlbumSuccess", updatedAlbums.data);
          return Promise.resolve(response);
        },
        (error) => {
          commit("addAlbumFailure");
          return Promise.reject(error);
        }
      );
    },
    updateAlbumAction({ commit }, { albumId, albumToUpdate }) {
      return AlbumsService.editAlbum(albumId, albumToUpdate).then(
        (response) => {
          commit("updateAlbumSuccess", response);
          return Promise.resolve(response);
        },
        (error) => {
          commit("updateAlbumFailure");
          return Promise.reject(error);
        }
      );
    },
    deleteAlbumAction({ commit }, { albumId, artistId }) {
      return AlbumsService.deleteAlbum(albumId).then(
        async () => {
          const updatedAlbums = await AlbumsService.getAlbumsOfArtist(artistId);

          commit("deleteAlbumSuccess", updatedAlbums.data);
          return Promise.resolve(updatedAlbums);
        },
        (error) => {
          commit("deleteAlbumFailure");
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
      getAlbumByIdSuccess(state, album) {
        state.album = album.data;
        state.getAlbumStatus = true;
      },
      getAlbumByIdFailure(state) {
        state.getAlbumStatus = false;
      },
      addAlbumSuccess(state, updatedAlbums) {
        state.albumsList = updatedAlbums;
        state.addAlbumStatus = true;
      },
      addAlbumFailure(state) {
        state.addAlbumStatus = false;
      },
      updateAlbumSuccess(state) {
        state.updateAlbumStatus = true;
      },
      updateAlbumFailure(state) {
        state.updateAlbumStatus = false;
      },
      deleteAlbumSuccess(state, updatedAlbums) {
        state.albumsList = updatedAlbums;
        state.deleteAlbumStatus = true;
      },
      deleteAlbumFailure(state) {
        state.deleteAlbumStatus = false;
      },
},
getters: {
    getAlbums: (state) => {
      return state.albumsList;
    },
    getAlbum: (state) => {
      return state.album;
    },
}
};