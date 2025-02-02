<template>
    <div
      v-if="getAlbums.message === 'This artist did not register any albums yet!'"
    >
      This artist did not make any album
  
      <button
        @click="handleAddAlbum"
        class="btn btn-outline-dark border border-3 border-dark d-flex justify-content-center align-items-center gap-2 fw-bold"
      >
        <font-awesome-icon icon="plus" />
        Album
      </button>
    </div>
  
    <article v-else>
      <header
        class="title-container my-3 d-flex justify-content-center align-items-center gap-3"
      >
        <h2>
          
          <span class="fw-bold fs-2">{{ getArtist.name }}</span>
        </h2>
  
        <button
          @click="handleAddAlbum"
          class="btn btn-outline-dark border border-3 border-dark d-flex justify-content-center align-items-center gap-2 fw-bold"
        >
          <font-awesome-icon icon="plus" />
          Album
        </button>
      </header>
  
      <albums-list
        :albums="getAlbums"
        @removeAlbum="handleDeleteAlbum"
        @updateAlbum="handleEditAlbum"
      />
    </article>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import AlbumsList from "@/components/AlbumsList";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  
  export default {
    name: "AlbumsOfArtistView",
    data() {
      return {
        artistId: "",
      };
    },
    components: { AlbumsList, FontAwesomeIcon },
    created() {
      if (this.getLoggedInStatus === false && this.getLoggedInUserData === null) {
        this.handleLogout();
      }
  
      this.artistId = this.$route.params.artistId;
  
      if (this.artistId !== "") {
        this.handleGetArtistById(this.artistId);
        this.handleGetAlbumsOfArtist(this.artistId);
      }
    },
    computed: {
      ...mapGetters("albumsModule", ["getAlbums"]),
      ...mapGetters("artistsModule", ["getArtist"]),
      ...mapGetters("auth", ["getLoggedInStatus", "getLoggedInUserData"]),
    },
    methods: {
      ...mapActions("albumsModule", [
        "getAlbumsOfArtistAction",
        "deleteAlbumAction",
      ]),
      ...mapActions("artistsModule", ["getArtistByIdAction"]),
      ...mapActions("auth", ["logout"]),
      handleLogout: function () {
        this.logout();
        this.$router.push("/login");
      },
      handleGetAlbumsOfArtist: async function (artistId) {
        try {
          await this.getAlbumsOfArtistAction(artistId);
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.handleLogout();
          }
          console.log(error);
        }
      },
      handleGetArtistById: async function (artistId) {
        try {
          await this.getArtistByIdAction(artistId);
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.handleLogout();
          }
          console.log(error);
        }
      },
      handleDeleteAlbum: async function ({ albumId, artistId }) {
        try {
          await this.deleteAlbumAction({ albumId, artistId });
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.handleLogout();
          }
          console.log(error);
        }
      },
      handleAddAlbum: function () {
        this.$router.push(`/addAlbumView/${this.artistId}`);
      },
      handleEditAlbum: function (payload) {
        const { albumId, artistId } = payload;
        this.$router.push(`/editAlbumView/${albumId}/artist/${artistId}`);
      },
    },
  };
  </script>
  
  <style scoped>
  @media (max-width: 430px) {
    .title-container {
      flex-direction: column !important;
      margin-top: 4rem !important;
      gap: 1rem !important;
    }
  
    .title-container h2 {
      width: 80% !important;
      margin: auto;
    }
  }
  </style>