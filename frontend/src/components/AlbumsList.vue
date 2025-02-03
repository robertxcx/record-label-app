<template>
    <article class="container-fluid">
      <div class="sorting-controls my-3 text-center" v-if="getLoggedInStatus">
        <button class="btn btn-secondary m-1" @click="sortAlbums()">Sort by Release Year</button>
      </div>
      <div class="row justify-content-center py-3 px-0">
        <div class="albums-container">
          <div
            class="album-card"
            v-for="album in localAlbums"
            :key="album.id"
          >
            <div class="card border-4 border-light rounded-5 h-100">
              <div class="card-body d-flex flex-column">
                <header>
                  <h5 class="card-title fs-4 fw-bold mb-5 mt-2" style="color: black;">
                    {{ album.title }}
                  </h5>
                </header>
  
                <div
                  class="d-flex justify-content-between align-items-center border border-2 border-dark p-2 my-2"
                >
                  <div class="fw-bold" style="color: black;">Year of release:</div>
                  <div style="color: black;"> {{ album.releaseYear }}</div>
                </div>
  
                <div class="border border-2 border-dark p-2 my-2 flex-grow-1">
                  <div class="fw-bold" style="color: black;">Tracks:</div>
                  <ul class="list-unstyled m-0" style="color: black;">
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
                    class="btn btn-sm btn-dark fw-bold fs-6 w-50"
                    @click="editAAlbum(album.albumId, album.artistId)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-dark fw-bold fs-6 w-50"
                    @click="deleteAAlbum(album.albumId, album.artistId)"
                  >
                    Delete
                  </button>
                </div>
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
.albums-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem; /* Spațiere între carduri */
}

.album-card {
  width: 20rem; /* Lățimea cardului - poți să o ajustezi */
}

.card {
  background-color: #1DB954;
  color: #ced6e0;
  display: flex;
  flex-direction: column;
}

.card:hover {
  background-color: #ced6e0;
  color: black;
}
</style>
  