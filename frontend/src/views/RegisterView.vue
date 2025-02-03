<template>
<article class="register-page">
  <div class="register-card">
    <h2 class="register-page-title">Sign up</h2>

    <Form @submit="handleRegister" :validation-schema="schema">
      <Field
        name="email"
        type="text"
        class="form-control register-input"
        v-model="user.email"
        placeholder="Email"
      />
      <ErrorMessage name="email" class="text-danger" />

      <Field
        name="password"
        type="password"
        class="form-control register-input"
        v-model="user.password"
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-danger" />

      <button
        class="control-btn btn btn-dark"
        :disabled="loading"
      >
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Sign up</span>
      </button>

      <button
        class="control-btn btn btn-outline-dark"
        @click="navigateToLoginPage"
      >
        Login
      </button>

      <div v-if="message" class="alert mt-3" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </Form>
  </div>
</article>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import { mapActions } from "vuex";
  
  export default {
    name: "RegisterPage",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const schema = yup.object().shape({
        email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
        password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
      });
  
      return {
        user: { email: "", password: "" },
        successful: false,
        hideElement: false,
        loading: false,
        message: "",
        schema,
      };
    },
    methods: {
      ...mapActions("auth", ["register"]),
      handleRegister: async function () {
        const userToRegister = {
          email: this.user.email,
          password: this.user.password,
        };
  
        this.message = "";
        this.successful = false;
        this.loading = true;
        try {
          const response = await this.register(userToRegister);
          this.message = response.message;
          this.successful = true;
          this.loading = false;
          this.hideElement = true;
          this.user = { email: "", password: "" };
        } catch (error) {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      },
      navigateToLoginPage: function () {
        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  width: 50%;
  max-width: 500px;
  padding: 3rem;
  background-color: #121212; /* Negru mat */
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.register-page-title {
  color: #1DB954; /* Verde Spotify */
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Circular', sans-serif; /* Font similar Spotify */
}

.register-input {
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 2px solid #1DB954;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  outline: none;
  margin-bottom: 1rem;
}

.register-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.control-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
}

.control-btn.btn-dark {
  background-color: #1DB954;
  color: #000;
}

.control-btn.btn-dark:hover {
  opacity: 0.8;
}

.control-btn.btn-outline-dark {
  border: 2px solid #1DB954;
  color: #1DB954;
  background-color: transparent;
}

.control-btn.btn-outline-dark:hover {
  background-color: transparent;
  color: rgb(255, 255, 255);
}

.text-danger {
  font-size: 0.9rem;
  font-weight: bold;
  color: red;
}

@media (max-width: 768px) {
  .register-card {
    width: 90%;
  }
}
  </style>
  