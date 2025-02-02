<template>
    <article class="container-fluid">
      <div class="sorting-controls my-3 text-center">
        <button class="btn btn-secondary m-1" @click="sortAlbums()">Sort by Release Year</button>
      </div>
      <div class="row justify-content-center py-3 px-0">
        <div
          class="card-container text-center col-xxl-6 col-xl-4 col-md-12 col-sm-4 p-0"
          v-for="album in localAlbums"
          :key="album.id"
        >
          <div class="card border-2 border-light rounded-0">
            <div class="card-body">
              <header>
                <h5 class="card-title fs-4 fw-bold mb-5 mt-2">
                  {{ album.title }}
                </h5>
              </header>
  
              <div
                class="d-flex justify-content-between align-items-center border border-2 border-light p-2 my-2"
              >
                <div class="fw-bold">Year of release:</div>
                <div>
                  {{ album.releaseYear }}
                </div>
              </div>
  
              <div class="border border-2 border-light p-2 my-2">
  <div class="fw-bold">Tracks:</div>
  <ul class="list-unstyled m-0">
    <li v-for="(track, index) in album.tracks" :key="index">
      {{ track.title }} ({{ formatDuration(track.duration) }})
    </li>
  </ul>
</div>

  
              <div
                v-if="getLoggedInStatus === true"
                class="d-flex justify-content-center align-items-center gap-2 mt-2"
              >
                <button
                  class="btn btn-sm btn-dark fw-bold fs-5 w-50"
                  @click="editAAlbum(album.albumId, album.artistId)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-dark fw-bold fs-5 w-50"
                  @click="deleteAAlbum(album.albumId, album.artistId)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "AlbumsList",
    props: ["albums"],
    components: {},
    data() {
      return {
        localAlbums: [],
        isAscending: true, // Track sorting order
      };
    },
    computed: {
      ...mapGetters("auth", ["getLoggedInStatus"]),
    },
    methods: {
      deleteAAlbum(albumId, artistId) {
        this.$emit("removeAlbum", { albumId, artistId });
      },
      editAAlbum(albumId, artistId) {
        this.$emit("updateAlbum", { albumId, artistId });
      },
      sortAlbums() {
        // Toggle sorting order
        this.isAscending = !this.isAscending;
  
        this.localAlbums = [...this.localAlbums.sort((a, b) => {
          const compareValue = this.isAscending ? a.releaseYear - b.releaseYear : b.releaseYear - a.releaseYear;
          return compareValue;
        })];
      },
      formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec.toString().padStart(2, "0")}`; // Ex: 3:18
  }
    },
      watch: {
      albums: {
        immediate: true,
        handler(newVal) {
          this.localAlbums = [...newVal];
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    width: 20rem;
  }
  .card-container {
    flex-basis: fit-content;
  }
  
  .card-container:hover {
    scale: 1.02;
  }
  
  .card {
    background-color: blue;
    color: #ced6e0;
  }
  
  .card:hover {
    background-color: #ced6e0;
    color: black
  }
  </style>
  