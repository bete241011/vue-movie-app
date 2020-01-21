<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" tag="span" style="cursor: pointer">
          <span style="font-weight: 300">Movie</span>
          <span style="font-weight: 900">App</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs4 md2>
        <v-text-field
          dense
          flat
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          hide-details
          label="Movie Name"
          v-model="searchString"
        ></v-text-field>
      </v-flex>
      <v-btn text :disabled="!dataAvailable" @click="searchMovie">
        <span class="mr-2">Search</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    searchMovie () {
      this.$router.push('/search/' + this.searchString)
      // eslint-disable-next-line semi
      this.searchString = '';
    }
  },
  computed: {
    dataAvailable () {
      // eslint-disable-next-line semi
      return this.searchString !== null && this.searchString !== '';
    }
  }
}
</script>
<style>
* {
  font-family: Lato;
}
</style>
