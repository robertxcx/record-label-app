<template>
  <div>
    <menu-bar />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MenuBar from "./components/MenuBar";
export default {
  name: "App",
  components: { MenuBar },
  mounted() {
    const currentDate = new Date();
    const tokenData = localStorage.getItem("tokenResponse");
    const jsonToken = JSON.parse(tokenData);

    if (jsonToken !== null) {
      const tokenExpiry = jsonToken.expiry;

      console.log(
        tokenExpiry + 3600 <
          new Date(currentDate).setHours(currentDate.getHours())
      );

      if (
        tokenExpiry + 3600 <
        new Date(currentDate).setHours(currentDate.getHours())
      ) {
        console.log("Token has expired! Please login again!");
        this.logout();
        location.reload();
      }
    }
  },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>