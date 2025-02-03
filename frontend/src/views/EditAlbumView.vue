<template>
    <article class="edit-album-view mt-4 mb-5">
      <header class="fw-bold fs-2 mt-4 mb-3">Edit Album</header>
      <Form v-if="getAlbum" @submit="handleEditAlbum" :validation-schema="schema" class="border border-2 border-dark p-5">
        <div class="form-group mb-3">
          <label for="title" class="fw-bold fs-4">Title</label>
          <Field name="title" type="text" class="form-control" v-model="getAlbum.title" />
          <ErrorMessage name="title" class="text-danger fw-bold" />
        </div>
  
        <div class="form-group mb-3">
          <label for="releaseYear" class="fw-bold fs-4">Release Year</label>
          <Field name="releaseYear" type="text" class="form-control" v-model="getAlbum.releaseYear" />
          <ErrorMessage name="releaseYear" class="text-danger fw-bold" />
        </div>
  
        <div class="form-group mb-3">
          <label for="tracks" class="fw-bold fs-4">Tracks</label>
          <div v-for="(track, index) in getAlbum.tracks" :key="index" class="mb-2 d-flex gap-2">
            <input type="text" placeholder="Track Title" v-model="track.title" class="form-control" />
            <input type="number" placeholder="Duration (sec)" v-model.number="track.duration" class="form-control" />
            <button @click="removeTrack(index)" type="button" class="btn btn-danger">X</button>
          </div>
          <button @click="addTrack" type="button" class="btn btn-primary">Add Track</button>
        </div>
  
        <button class="btn btn-warning" type="submit">Save Changes</button>
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
  