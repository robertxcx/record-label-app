<template>
    <article class="container-fluid">
      <div class="sorting-controls my-3 text-center" v-if="getLoggedInStatus">
        <button class="btn btn-secondary m-1" @click="sortArtists('name')">Sort by Name</button>
        <button class="btn btn-secondary m-1" @click="sortArtists('genre')">Sort by Genre</button>
        <button class="btn btn-secondary m-1" @click="sortArtists('country')">Sort by Country</button>
      </div>
      <div class="row justify-content-center py-3 px-0">
        <div class="card-container-wrapper">
        <div
          class="card-container text-center col-xxl-6 col-xl-4 col-md-12 col-sm-4 p-0"
          v-for="artist in paginatedArtists"
          :key="artist.id"
        >
        <div class="card border-2 border-light rounded-0 card-hover">
            <div class="card-body">
              <header>
                <h5 class="card-title fs-4 fw-bold mb-5 mt-2 ">
                 {{ artist.name }}
                </h5>
              </header>
  
              <div
                class="d-flex justify-content-between align-items-center border border-2 border-light p-2 my-2"
              >
                <div class="fw-bold">Genre:</div>
                <div>{{ artist.genre }}</div>
              </div>
  
              <div
                class="d-flex justify-content-between align-items-center border border-2 border-light p-2 my-2"
              >
                <div class="fw-bold">Country:</div>
                <div>{{ artist.country }}</div>
              </div>
  
              <button
                class="btn btn-dark fw-bold  rounded-circle d-flex justify-content-center align-items-center gap-2 mx-auto mt-3"
                type="button"
                @click="handleNavigateToAlbumsPage(artist.artistId)"
              >
                <span>Albums</span>
              </button>
  
              <div
                v-if="getLoggedInStatus === true"
                class="d-flex justify-content-center align-items-center gap-2 mt-2"
              >
                <button
                  class="btn btn-sm btn-black"
                  @click="editAArtist(artist.artistId)"
                >
                  <font-awesome-icon icon="pen" />
                </button>
                <button
                  class="btn btn-sm btn-black"
                  @click="deleteAArtist(artist.artistId)"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
      </li>
      <li class="page-item" :class="{ active: n === currentPage }" v-for="n in totalPages" :key="n">
        <button class="page-link" @click="currentPage = n">{{ n }}</button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
      </li>
    </ul>
  </nav>
    </article>
  </template>
  
  <script>
 import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { mapGetters } from "vuex";
  
  export default {
    name: "ArtistsList",
    props: ["artists"],
    components: {
    FontAwesomeIcon,
  },
    data() {
      return {
        localArtists: [],
      currentPage: 1,
      itemsPerPage: 10,
      sortCriterion: null,
      isAscending: true, 
      };
    },
    mounted() {
      const wrapper = this.$el.querySelector('.card-container-wrapper');
  
      let isDown = false;
      let startX;
      let scrollLeft;
  
      wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        wrapper.classList.add('active');
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
      });
  
      wrapper.addEventListener('mouseleave', () => {
        isDown = false;
        wrapper.classList.remove('active');
      });
  
      wrapper.addEventListener('mouseup', () => {
        isDown = false;
        wrapper.classList.remove('active');
      });
  
      wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 2;
        wrapper.scrollLeft = scrollLeft - walk;
      });
    },
    computed: {
      ...mapGetters("auth", ["getLoggedInStatus"]),
      paginatedArtists() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.localArtists.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.localArtists.length / this.itemsPerPage);
    },
    },
    watch: {
      artists: {
        immediate: true,
        handler(newVal) {
      console.log("Artists received in ArtistsList:", newVal);
      this.localArtists = [...newVal];
    },
      },
    },
    methods: {
      handleNavigateToAlbumsPage: function (artistId) {
        this.$router.push(`/albumsOfArtistView/${artistId}`);
      },
      deleteAArtist(artistId) {
        this.$emit("removeArtist", artistId);
      },
      editAArtist(artistId) {
        this.$emit("updateArtist", artistId);
      },
      sortArtists(criterion) {
  const isAscending = this.sortCriterion !== criterion || !this.isAscending;

  console.log(`Before sorting by ${criterion}:`, this.localArtists.map(c => `${c.name}: ${c[criterion]}`));

  this.localArtists = [...this.localArtists.sort((a, b) => {
    const valueA = a[criterion].toLowerCase();
    const valueB = b[criterion].toLowerCase();
    
    return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  })];

  this.sortCriterion = criterion;
  this.isAscending = isAscending;

  console.log(`After sorting by ${criterion}:`, this.localArtists.map(c => `${c.name}: ${c[criterion]}`));

  this.currentPage = 1;
}
    },
  };
  </script>
  
  <style scoped>
  .card {
    width: 20rem;
    height: 100%; /* Adjust based on your design needs */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* This helps distribute the space inside the card */
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
  }
  .card-container {
    flex-basis: fit-content;
    
  }
  
  .card-container-wrapper {
    display: flex;
    overflow: hidden; 
    cursor: grab; 
    scroll-behavior: smooth; 
    -webkit-overflow-scrolling: touch; 
  }
  
  .card-container-wrapper:active {
    cursor: grabbing; 
  }
  
  
  .card-container-wrapper::selection {
    background-color: transparent;
  }
  
  .card-container:hover {
    scale: 1.02;
  }
  
  
  .card {
    background-color: #3742fa;
    color: #ced6e0;
  }
  
  .card:hover {
    background-color: #ced6e0;
    color: #3742fa;
  }
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card:hover {
    transform: translateY(-5px); /* Move the card up by 5 pixels when hovered */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
    transition: transform 0.2s, box-shadow 0.2s; /* Add smooth transitions */
  }
  
  </style>
  