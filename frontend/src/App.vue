<template>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
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