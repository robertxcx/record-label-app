<template>
    <article class="edit-album-view mt-4 mb-5">
      <header class="fw-bold fs-2 mt-4 mb-3 text-center">Edit Album</header>
      <Form v-if="getAlbum" @submit="handleEditAlbum" :validation-schema="schema" class="border border-0 border-dark p-5 rounded form-container">
        <div class="form-group mb-3">
          <label for="title" class="fw-bold fs-4">Title</label>
          <Field name="title" type="text" class="form-control input-box" v-model="getAlbum.title" />
          <ErrorMessage name="title" class="text-danger fw-bold" />
        </div>
  
        <div class="form-group mb-3">
          <label for="releaseYear" class="fw-bold fs-4">Release Year</label>
          <Field name="releaseYear" type="text" class="form-control input-box" v-model="getAlbum.releaseYear" />
          <ErrorMessage name="releaseYear" class="text-danger fw-bold" />
        </div>
  
        <div class="form-group mb-3">
          <label for="tracks" class="fw-bold fs-4">Tracks</label>
          <div v-for="(track, index) in getAlbum.tracks" :key="index" class="mb-2 d-flex gap-2">
            <input type="text" placeholder="Track Title" v-model="track.title" class="form-control input-box" />
            <input type="number" placeholder="Duration (sec)" v-model.number="track.duration" class="form-control input-box" />
            <button @click="removeTrack(index)" type="button" class="btn btn-black">X</button>
          </div>
          <button @click="addTrack" type="button" class="btn btn-black">Add Track</button>
        </div>
  
        <button class="btn btn-black" type="submit">Save Changes</button>
      </Form>
    </article>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: "EditAlbumView",
    components: { Form, Field, ErrorMessage },
    computed: {
      ...mapGetters("albumsModule", ["getAlbum"]),
    },
    data() {
      return {
        schema: yup.object().shape({
          title: yup.string().required("Title is required!"),
          releaseYear: yup.string().required("Release Year is required!"),
        }),
      };
    },
    methods: {
      ...mapActions("albumsModule", ["getAlbumByIdAction", "updateAlbumAction"]),
      addTrack() {
        this.getAlbum.tracks.push({ title: "", duration: 0 });
      },
      removeTrack(index) {
        this.getAlbum.tracks.splice(index, 1);
      },
      async handleEditAlbum() {
        try {
          await this.updateAlbumAction({ albumId: this.$route.params.albumId, albumToUpdate: this.getAlbum });
        } catch (error) {
          console.error(error);
        }
      },
    },
    created() {
      this.getAlbumByIdAction(this.$route.params.albumId);
    },
  };
  </script>

<style scoped>
.form-container {
  max-width: 700px; /* Ajustează lățimea maximă după necesități */
  margin: 0 auto; /* Centrează formularul */
}

.input-box {
  border: 1px solid black !important;
  background-color: transparent; /* Elimină fundalul implicit */
  color: black; /* Culoarea textului */
}

.input-box::placeholder {
  color: #888; /* Culoarea placeholder-ului */
}

.btn-black {
  background-color: black;
  border-color: black;
  color: white;
}
.btn-black:hover {
    background-color: white;
    color: black;
}
/* Stiluri pentru dark mode (dacă este necesar) */
.dark .input-box {
  border-color: white !important;
  color: white;
}

.dark .input-box::placeholder {
  color: #ccc;
}
</style>
  