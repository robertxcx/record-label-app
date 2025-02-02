import ArtistsService from "@/services/artists.service";

const initialState = {
  artistsList: [],
  artist: {},
  getArtistsListStatus: false,
  getArtistStatus: false,
  addArtistStatus: false,
  updateArtistStatus: false,
  deleteArtistStatus: false,
};

export const artistsModule = {
  namespaced: true,
  state: initialState,
  actions: {
    getListOfArtistsAction({ commit }) {
      return ArtistsService.getAllArtists().then(
        (response) => {
          commit("getArtistsListSuccess", response);
          return Promise.resolve(response);
        },
        (error) => {
          commit("getArtistsLisFailure");
          return Promise.reject(error);
        }
      );
    },
    getArtistByIdAction({ commit }, artistId) {
      return ArtistsService.getArtistById(artistId).then(
        (response) => {
          commit("getArtistByIdSuccess", response);
          return Promise.resolve(response);
        },
        (error) => {
          commit("getArtistByIdFailure");
          return Promise.reject(error);
        }
      );
    },
    addArtistAction({ commit }, { artistToAdd }) {
      return ArtistsService.addArtist(artistToAdd).then(
        async (response) => {
          const updatedArtists = await ArtistsService.getAllArtists();

          commit("addArtistSuccess", updatedArtists.data);
          return Promise.resolve(response);
        },
        (error) => {
          commit("addArtistFailure");
          return Promise.reject(error);
        }
      );
    },
    updateArtistAction({ commit }, { artistId, artistToUpdate }) {
      return ArtistsService.editArtist(artistId, artistToUpdate).then(
        (response) => {
          commit("updateArtistSuccess", response);
          return Promise.resolve(response);
        },
        (error) => {
          commit("updateArtistFailure");
          return Promise.reject(error);
        }
      );
    },
    deleteArtistAction({ commit }, artistId) {
      return ArtistsService.deleteArtist(artistId).then(
        async () => {
          const updatedArtists = await ArtistsService.getAllArtists();

          commit("deleteArtistSuccess", updatedArtists.data);
          return Promise.resolve(updatedArtists);
        },
        (error) => {
          commit("deleteArtistFailure");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    getArtistsListSuccess(state, artists) {
      state.artistsList = artists.data;
      state.getArtistsListStatus = true;
    },
    getArtistsLisFailure(state) {
      state.getArtistsListStatus = false;
    },
    getArtistByIdSuccess(state, artist) {
      state.artist = artist.data;
      state.getArtistStatus = true;
    },
    getArtistByIdFailure(state) {
      state.getArtistStatus = false;
    },
    addArtistSuccess(state, updatedArtists) {
      state.artistsList = updatedArtists;
      state.addArtistStatus = true;
    },
    addArtistFailure(state) {
      state.addArtistStatus = false;
    },
    updateArtistSuccess(state) {
      state.updateArtistStatus = true;
    },
    updateArtistFailure(state) {
      state.updateArtistStatus = false;
    },
    deleteArtistSuccess(state, updatedArtists) {
      state.artistsList = updatedArtists;
      state.deleteArtistStatus = true;
    },
    deleteArtistFailure(state) {
      state.deleteArtistStatus = false;
    },
  },
  getters: {
    getArtists: (state) => {
      return state.artistsList;
    },
    getArtist: (state) => {
      return state.artist;
    },
  },
};
