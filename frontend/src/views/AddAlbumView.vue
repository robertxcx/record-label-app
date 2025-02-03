<template>
    <article class="add-album-view mt-3 mb-5">
      <header class="fw-bold fs-2 my-2">Add an Album</header>
      <Form @submit="handleAddAlbum" :validation-schema="schema" class="border border-2 border-dark p-4">
        <div class="form-group mb-3">
          <label for="title" class="fw-bold fs-4">Title</label>
          <Field name="title" type="text" class="form-control" v-model="albumToAdd.title" />
          <ErrorMessage name="title" class="text-danger fw-bold" />
        </div>
  
        <div class="form-group mb-3">
          <label for="releaseYear" class="fw-bold fs-4">Release Year</label>
          <Field name="releaseYear" type="text" class="form-control" v-model="albumToAdd.releaseYear" />
          <ErrorMessage name="releaseYear" class="text-danger fw-bold" />
        </div>
  
        <div class="form-group mb-3">
          <label for="tracks" class="fw-bold fs-4">Tracks</label>
          <div v-for="(track, index) in albumToAdd.tracks" :key="index" class="mb-2 d-flex gap-2">
            <input type="text" placeholder="Track Title" v-model="track.title" class="form-control" />
            <input type="number" placeholder="Duration (sec)" v-model.number="track.duration" class="form-control" />
            <button @click="removeTrack(index)" type="button" class="btn btn-danger">X</button>
          </div>
          <button @click="addTrack" type="button" class="btn btn-primary">Add Track</button>
        </div>
  
        <button class="btn btn-success" type="submit">Add Album</button>
      </Form>
    </article>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import { mapActions } from "vuex";
  
  export default {
    name: "AddAlbumView",
    components: { Form, Field, ErrorMessage },
    data() {
      return {
        schema: yup.object().shape({
          title: yup.string().required("Title is required!"),
          releaseYear: yup.string().required("Release Year is required!"),
        }),
        albumToAdd: {
          title: "",
          releaseYear: "",
          tracks: [],
        },
      };
    },
    methods: {
      ...mapActions("albumsModule", ["addAlbumAction"]),
      addTrack() {
        this.albumToAdd.tracks.push({ title: "", duration: 0 });
      },
      removeTrack(index) {
        this.albumToAdd.tracks.splice(index, 1);
      },
      async handleAddAlbum() {
        try {
          await this.addAlbumAction({
            artistId: this.$route.params.artistId,
            albumToAdd: this.albumToAdd,
          });
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>