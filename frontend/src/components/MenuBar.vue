<template>
    <article id="nav-bar">
      <router-link
        to="/"
        id="home-link"
        class="home-btn-element fs-1 d-flex justify-content-center align-items-center gap-3 flex-row"
      >
        <font-awesome-icon icon="gamepad" />
        <h1>Gamification</h1>
      </router-link>
  
      <menu-links :userEmail="getLoggedInUserEmail" />
    </article>
  </template>
  
  <script>
  import MenuLinks from "./MenuLinks";
  import { mapGetters } from "vuex";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  
  export default {
    name: "MenuBar",
    data() {
      return {
        userEmail: {},
      };
    },
    created() {
      this.userEmail = localStorage.getItem("userEmail");
    },
    computed: {
      ...mapGetters("auth", ["getLoggedInStatus", "getLoggedInUserEmail"]),
    },
    components: {
      MenuLinks,
      FontAwesomeIcon,
    },
  };
  </script>
  
  <style scoped>
  .home-btn-element {
    color: black;
  }
  
  #nav-bar {
    border-bottom: 1px solid #ddd;
    height: 10vh;
    width: 100%;
  }
  
  #home-link {
    text-align: center;
    display: block;
    font-size: 22px;
    left: 32px;
    position: absolute;
    top: 16px;
    text-decoration: none;
  }
  
  #home-link h1 {
    margin: 0;
    font-weight: 700;
  }
  
  @media (max-width: 1024px) {
    #nav-bar {
      height: 5.5vh;
    }
  }
  
  @media (max-width: 500px) {
    #nav-bar {
      margin-bottom: 2rem;
      height: 12vh;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    #home-link {
      position: static;
      top: 6%;
    }
  }
  
  @media (max-width: 430px) {
    #nav-bar {
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;
      height: 15vh;
    }
  }
  </style>
  