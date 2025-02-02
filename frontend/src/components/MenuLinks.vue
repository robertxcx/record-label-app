<template>
    <article
      class="nav-links-container d-flex justify-content-end align-items-center gap-3"
    >
      <div
        v-if="userEmail !== null"
        class="logged-in-links-container d-flex justify-content-center align-items-center gap-2"
      >
        <div
          class="welcome-msg-container fst-italic fs-5 d-flex justify-content-center align-items-center gap-2"
        >
          <div class="profile-img-container" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
            <img
    id="profile-img"
    :src="profileImageUrl || require('@/assets/profile_img.png')"
    class="profile-img-card"
    @click="triggerFileUpload"
  />
            <AddPhoto ref="addPhotoComponent" @photoUploaded="handlePhotoUploaded" />
            <div class="tooltip" v-if="showTooltip">
              Current administrator: {{ userEmail }}
            </div>
          </div>
        </div>
  
        <router-link
          to="/addArtistView"
          id="addArtist-btn"
          class="nav-link logged-in-btn"
        >
          <button
            class="artist-btn btn btn-black fw-bold border-dark border-2"
          >
            <font-awesome-icon icon="plus" />
            Artist
          </button>
        </router-link>
  
        <router-link to="/" id="logout-btn" class="nav-link logged-in-btn">
          <button
            class="logout-btn btn btn-dark fw-bold border-dark border-2"
            @click="handleLogout"
          >
            <font-awesome-icon icon="right-from-bracket" />
            Logout
          </button>
        </router-link>
      </div>
  
      <div
        class="auth-links-container d-flex justify-content-center align-items-center gap-2"
        v-else
      >
        <router-link to="/register" class="nav-link">
          <button class="btn btn-light fw-bold border border-info border-0">
            <font-awesome-icon icon="user-plus" />
          </button>
        </router-link>
  
        <router-link to="/login" class="nav-link">
          <button
            class="btn btn-outline-light fw-bold border border-info border-0"
          >
            <font-awesome-icon icon="lock-open" style="color: black;" />
          </button>
        </router-link>
      </div>
    </article>
  </template>
  
  <script>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { mapActions } from "vuex";
  import AddPhoto from '@/components/AddPhoto.vue';
  export default {
    name: "MenuLinks",
    components: {
      FontAwesomeIcon,
      AddPhoto,
    },
    props: ["userEmail"],
    data() {
      return {
        showTooltip: false, // Define showTooltip here
        profileImageUrl: null,
      };
    },
    mounted() {
    const storedImageUrl = localStorage.getItem('userProfileImageUrl');
    if (storedImageUrl) {
      this.profileImageUrl = storedImageUrl;
    }
  },
    methods: {
      ...mapActions("auth", ["logout"]),
      handleLogout: function () {
        this.logout();
        this.$router.push("/login");
      },
      triggerFileUpload() {
      this.$refs.addPhotoComponent.triggerInput();
    },
    handlePhotoUploaded(url) {
    this.profileImageUrl = url;
    localStorage.setItem('userProfileImageUrl', url); // Store for future sessions
  },
    },
  };
  </script>
  
  <style scoped>
  .profile-img-card {
    width: 2rem;
    border-radius: 50%;
  }
  
  .profile-img-container {
    position: relative;
  }
  
  .tooltip {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 1;
    top: 120%; /* Position the tooltip below the image */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
  }
  
  .profile-img-container:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
  
  .nav-links-container {
    position: absolute;
    right: 0;
    top: 1rem;
    margin: auto 2rem auto;
  }
  
  @media (max-width: 500px) {
    .nav-links-container {
      position: static;
      margin: 0;
    }
  
    .nav-link {
      width: 8rem;
    }
  
    .nav-link > button {
      width: 100%;
    }
  
    .auth-links-container {
      flex-direction: column;
    }
  
    .logged-in-links-container {
      flex-direction: column;
      width: 13rem;
    }
  
    .logged-in-btn {
      display: none;
    }
  
    #logout-btn {
      position: absolute;
      right: 1rem;
      top: 7.75rem;
      display: inline-block;
    }
  
    #logout-btn > button {
      padding: 0.25rem;
    }
  
    #addArtist-btn {
      position: absolute;
      left: 1rem;
      top: 7.75rem;
      display: inline-block;
    }
  
    #addArtist-btn > button {
      padding: 0.25rem;
    }
  
    .welcome-msg-container {
      flex-direction: column !important;
      gap: 0rem !important;
    }
  }
  
  @media (max-width: 430px) {
    #addArtist-btn {
      top: 9rem;
    }
  
    #logout-btn {
      top: 9rem;
    }
  }
  
  </style>
  