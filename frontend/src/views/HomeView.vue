<template>
    <article class="w-75 m-auto">
      <h2
        class="home-page-title fw-bold mt-3 d-flex justify-content-center align-items-center flex-row gap-3 text-primary"
      >
       
        <div class="fst-italic fs-1" 
        style="color: black;">Albums</div>
      </h2>
  
      <artists-list
        :artists="getArtists"
        @removeArtist="handleDeleteArtist"
        @updateArtist="handleUpdateArtist"
      />
    </article>
  </template>
  
  <script>
  
  import { mapGetters, mapActions } from "vuex";
  import ArtistsList from "@/components/ArtistsList.vue";
  
  export default {
    name: "HomeView",
    components: {  ArtistsList },
    data() {
      return {
      };
    },
    created() {
      this.handleGetListOfArtists();
    },
    computed: {
      ...mapGetters("artistsModule", ["getArtists"]),
    },
    methods: {
      ...mapActions("artistsModule", [
        "getListOfArtistsAction",
        "deleteArtistAction",
        "updateArtistAction",
      ]),
      ...mapActions("auth", ["logout"]),
      handleLogout: function () {
        this.logout();
        this.$router.push("/login");
      },
      handleGetListOfArtists: async function () {
        try {
          await this.getListOfArtistsAction();
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.handleLogout();
          }
          console.log(error);
        }
      },
      handleUpdateArtist: function (artistId) {
        console.log(artistId);
        try {
          this.$router.push(`/editArtistView/${artistId}`);
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.handleLogout();
          }
          console.log(error);
        }
      },
      handleDeleteArtist: async function (artistId) {
        try {
          await this.deleteArtistAction(artistId);
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.handleLogout();
          }
          console.log(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @media (max-width: 430px) {
    .home-page-title {
      margin-top: 5rem !important;
    }
  }
  </style>
  