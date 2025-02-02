<template>
    <article class="add-artist-view">
      <header class="fw-bold fs-2 my-3">Add a artist</header>
  
      <Form @submit="handleAddArtist" :validation-schema="schema">
        <div class="form-group mb-3">
          <label for="name" class="fw-bold fs-4">Name</label>
          <div>
            <Field
              name="name"
              type="text"
              class="form-control register-input fw-bold m-auto border border-2 border-dark"
              v-model="artistToAdd.name"
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
            v-model="artistToAdd.genre"
          />
          <ErrorMessage name="genre" class="text-danger fw-bold" />
        </div>
  
        <div class="form-group mb-3">
          <label for="country" class="fw-bold fs-4">Country</label>
          <Field
            name="country"
            type="text"
            class="form-control register-input fw-bold m-auto border border-2 border-dark"
            v-model="artistToAdd.country"
          />
          <ErrorMessage name="country" class="text-danger fw-bold" />
        </div>
  
        <div
          class="form-group d-flex justify-content-center align-items-center flex-column gap-3 mt-5"
        >
          <button
            class="action-btn btn btn-outline-black fw-bold border border-3 border-black w-50"
            :disabled="loading"
            type="submit"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Add</span>
          </button>
  
          <button
            class="action-btn btn btn-outline-outline-black fw-bold border border-3 border-black w-50"
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
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import { mapGetters, mapActions } from "vuex";
  
  
  export default {
    name: "AddArtistView",
    components: { Form, Field, ErrorMessage },
    data() {
      const schema = yup.object().shape({
        name: yup.string().required("Name is required!"),
        genre: yup.string().required("Genre is required!"),
        country: yup.string().required("Country is required!"),
      });
  
      return {
        schema,
        message: "",
        loading: false,
        successful: false,
        artistToAdd: {
          name: "",
          genre: "",
          country: "",
        },
      };
    },
    computed: {
      ...mapGetters("auth", ["getLoggedInStatus", "getLoggedInUserData"]),
    },
    created() {
      if (this.getLoggedInStatus === false && this.getLoggedInUserData === null) {
        this.handleLogout();
      }
    },
    methods: {
      ...mapActions("artistsModule", ["addArtistAction"]),
      ...mapActions("auth", ["logout"]),
      handleLogout: function () {
        this.logout();
        this.$router.push("/login");
      },
      handleAddArtist: async function () {
        let artistToAddValue = {};
  
  
        artistToAddValue = {
          name: this.artistToAdd.name,
          genre: this.artistToAdd.genre,
          country: this.artistToAdd.country,
        };
  
  
        try {
          const response = await this.addArtistAction({
            artistToAdd: artistToAddValue,
          });
  
          if (response.status === 200) {
            this.message = "Added successfully";
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
  .add-artist-view {
    padding: 4rem;
    padding-top: 2rem;
  }
  
  .add-artist-view form {
    border: 2.5px solid black;
    border-radius: 0.5rem;
    padding: 2rem;
    width: 35%;
    margin: auto;
  }
  
  @media (max-width: 1024px) {
    .add-artist-view form {
      width: 55%;
    }
  }
  
  @media (max-width: 430px) {
    .add-artist-view {
      padding: 1rem 2rem 3rem !important;
    }
    .add-artist-view form {
      width: 100%;
    }
  
    .action-btn {
      width: 75% !important;
    }
  }
  </style>
  