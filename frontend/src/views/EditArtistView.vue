<template>
    <article class="edit-artist-view mt-4 mb-5">
      <h2 class="fw-bold fs-2 mt-3 mb-4"></h2>
  
      <Form
        @submit="handleEditArtist"
        :validation-schema="schema"
        class="border border-0 border-dark p-1"
      >
      <div><label  class="fw-bold fs-4 h1 mt-4">Edit artist data</label></div>
        <div class="form-group mb-3">
          <label for="name" class="fw-bold fs-4 mt-5">Name</label>
          <div>
            <Field
              name="name"
              type="text"
              class="form-control register-input fw-bold m-auto border border-2 border-dark"
              v-model="getArtist.name"
            />
            <ErrorMessage name="name" class="text-danger fw-bold" />
          </div>
        </div>
  
        <div class="form-group mb-3">
          <label for="genre" class="fw-bold fs-4"
            >Genre</label
          >
          <Field
            name="genre"
            type="text"
            class="form-control register-input fw-bold m-auto border border-2 border-dark"
            v-model="getArtist.genre"
          />
          <ErrorMessage name="genre" class="text-danger fw-bold" />
        </div>
  
        <div class="form-group mb-3">
          <label for="country" class="fw-bold fs-4">Country</label>
          <Field
            name="country"
            type="text"
            class="form-control register-input fw-bold m-auto border border-2 border-dark"
            v-model="getArtist.country"
          />
          <ErrorMessage name="country" class="text-danger fw-bold" />
        </div>
        <div
          class="form-group d-flex justify-content-center align-items-center flex-column gap-3 mt-5"
        >
          <button
            class="action-btn btn btn-outline-black fw-bold border border-3 border-black w-50 m-auto"
            :disabled="loading"
            type="submit"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Edit</span>
          </button>
  
          <button
            class="action-btn btn btn-outline-black fw-bold border border-3 border-black w-50 m-auto"
            @click="handleGoBack"
            type="button"
          >
            Back
          </button>
        </div>
  
        <div class="form-group mt-3">
          <div
            v-if="message"
            class="alert fw-bold"
            role="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
      </Form>
    </article>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  
  export default {
    name: "EditArtistView",
    data() {
      const schema = yup.object().shape({
        name: yup.string().required("Name is required!"),
        genre: yup.string().required("Genre is required!"),
        country: yup.string().required("Country is required!"),
      });
  
      return {
        artistId: "",
        schema,
        message: "",
        loading: false,
        successful: false,
      };
    },
    components: { Form, Field, ErrorMessage },
    created() {
      this.artistId = this.$route.params.artistId;
  
      if (this.getLoggedInStatus === true && this.getLoggedInUserData !== null) {
        if (this.artistId) {
          this.handleGetArtistById(this.artistId);
        }
      } else {
        this.handleLogout();
      }
    },
    computed: {
      ...mapGetters("auth", ["getLoggedInStatus", "getLoggedInUserData"]),
      ...mapGetters("artistsModule", ["getArtist"]),
    },
    methods: {
      ...mapActions("artistsModule", [
        "getArtistByIdAction",
        "updateArtistAction",
      ]),
      ...mapActions("auth", ["logout"]),
      handleLogout: function () {
        this.logout();
        this.$router.push("/login");
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
      handleEditArtist: async function () {
        let artistToUpdate = {
          name: this.getArtist.name,
          genre: this.getArtist.genre,
          country: this.getArtist.country,
        };
  
        try {
          const response = await this.updateArtistAction({
            artistId: this.artistId,
            artistToUpdate,
          });
  
          if (response.status === 200) {
            this.message = "Updated successfully";
            this.successful = true;
            this.loading = false;
          }
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.handleLogout();
          }
  
          console.log(error);
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        } finally {
          this.setAutoHideAlert();
        }
      },
      setAutoHideAlert: function () {
        setTimeout(() => {
          this.message = "";
        }, 3500);
      },
      handleGoBack: function () {
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-artist-view form {
    width: 35%;
    margin: auto;
  }
  
  @media (max-width: 1024px) {
    .edit-artist-view form {
      width: 55%;
    }
  }
  
  @media (max-width: 430px) {
    .edit-artist-view {
      margin-top: 5rem !important;
    }
    .edit-artist-view form {
      width: 80%;
    }
  
    .action-btn {
      width: 75% !important;
    }
  }
  </style>
  