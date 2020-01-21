<template>
  <v-container v-if="loading">
    <div class="text-md-center text-sm-center">
      <v-progress-circular indeterminate :size="70" :width="7" color="green"></v-progress-circular>
    </div>
  </v-container>

  <v-container v-else>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-img :src="movieDetail.Poster" aspect-ratio="2"></v-img>
          <v-card-title primary-title>
            <div>
              <h3>{{ movieDetail.Title }}-{{ movieDetail.Year }}</h3>
              <p class="subtitle-1">{{ movieDetail.Plot }}</p>
              <h3>Actors:</h3>
              <p class="subtitle-1">{{ movieDetail.Actors }}</p>
              <h4>Awards:</h4>
              <p class="subtitle-1">{{ movieDetail.Awards }}</p>
              <h4>Genre:</h4>
              <p class="subtitle-1">{{ movieDetail.Genre }}</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn text color="green" @click="back">back</v-btn>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="green" dark>View Ratings</v-btn>
              </template>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Ratings</v-card-title>
                <v-card-text class="mt-5">
                  <table style="width:100%">
                    <tr>
                      <th>Source</th>
                      <th>Ratings</th>
                    </tr>
                    <tr v-for="(rating, index) in this.ratings" :key="index">
                      <td align="end">{{ ratings[index].Source }}</td>
                      <td align="center">
                        <v-rating :half-increments="true" :value="ratings[index].Value"></v-rating>
                      </td>
                    </tr>
                  </table>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">OK</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },

  mounted () {
    this.getMovieDetail()
    // console.log(this.movieDetail)
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    getMovieDetail () {
      this.$store.dispatch('getMovieDetail', this.$route.params.id)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    movieDetail () {
      return this.$store.getters.movieDetail
    },
    ratings () {
      return this.$store.getters.ratings
    }
  }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
