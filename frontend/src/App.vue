<template>
 <div :class="{ dark: isDarkMode }">
    <router-view />
    <button @click="toggleDarkMode">
      Toggle Dark Mode ({{ isDarkMode ? 'Dark' : 'Light' }})
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(['isDarkMode']),
  },
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
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  watch: {
    isDarkMode(newValue) {
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
  methods: {
    ...mapActions("auth", ["logout"], "toggleDarkMode"),
  },
};
</script>