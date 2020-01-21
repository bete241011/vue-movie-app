<template>
  <v-container v-if="loading">
    <div class="text-md-center text-sm-center">
      <v-progress-circular indeterminate :size="70" :width="7" color="green"></v-progress-circular>
    </div>
  </v-container>

  <v-container v-else-if="noData">
    <div class="text-md-center text-sm-center">
      <h2>No movie in API with {{ this.name }}</h2>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 v-for="(movie, index) in movies" :key="index" mb-2>
        <v-card>
          <v-img :src="movie.Poster" aspect-ratio="1"></v-img>

          <v-card-title primary-title>
            <div>
              <h4 style="font-weight: 900">{{ movie.Title }}</h4>
              <div class="subtitle-1">Year: {{ movie.Year }}</div>
              <div class="subtitle-1">Type: {{ movie.Type }}</div>
              <div class="subtitle-1">IMDB-id: {{ movie.imdbID }}</div>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn text color="green" @click="movieDetail(movie.imdbID)">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['name'],
  data () {
    return {}
  },
  methods: {
    movieDetail (id) {
      this.$router.push('/movie/' + id)
    },
    searchByMovieName (movieName) {
      this.$store.dispatch('searchByMovieName', movieName)
    }
  },
  mounted () {
    this.searchByMovieName(this.name)
  },
  watch: {
    name (movieName) {
      this.searchByMovieName(movieName)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    noData () {
      return this.$store.getters.noData
    },
    movies () {
      return this.$store.getters.movies
    }
  }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
