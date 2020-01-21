import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: 'db3652e4',
    loading: false,
    noData: false,
    movies: [],
    movieDetail: '',
    ratings: ''
  },
  getters: {
    loading (state) {
      return state.loading
    },
    noData (state) {
      return state.noData
    },
    movies (state) {
      return state.movies
    },
    movieDetail (state) {
      return state.movieDetail
    },
    ratings (state) {
      return state.ratings
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setNoData (state, payload) {
      state.noData = payload
    },
    setMovies (state, payload) {
      state.movies = payload
    },
    setMovieDetail (state, payload) {
      state.movieDetail = payload
    },
    setRating (state, payload) {
      state.ratings = payload
    }
  },
  actions: {
    async getMovies ({
      state,
      commit
    }, payload) {
      try {
        commit('setLoading', true)
        let response = await axios.get(`http://www.omdbapi.com/?s=${payload}&apikey=${state.apiKey}&page=1&Content-Type=application/json`)
        if (response.data.Response === 'True') {
          commit('setMovies', response.data.Search)
          commit('setLoading', false)
          commit('setNoData', false)
        } else {
          commit('setNoData', true)
          commit('setLoading', false)
        }
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    async searchByMovieName ({
      state,
      commit
    }, payload) {
      try {
        commit('setLoading', true)
        let response = await axios.get(`http://www.omdbapi.com/?s=${payload}&apikey=${state.apiKey}&page=1&Content-Type=application/json`)
        if (response.data.Response === 'True') {
          commit('setMovies', response.data.Search)
          commit('setLoading', false)
          commit('setNoData', false)
        } else {
          commit('setNoData', true)
          commit('setLoading', false)
        }
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    async getMovieDetail ({
      state,
      commit
    }, id) {
      try {
        commit('setLoading', true)
        let response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${state.apiKey}&page=1&Content-Type=application/json`)
        commit('setMovieDetail', response.data)
        commit('setRating', state.movieDetail.Ratings)
        state.ratings.forEach(function (element) {
          element.Value = parseFloat(element.Value.split(/\/|%/)[0])
          element.Value =
            element.Value <= 10 ? element.Value / 2 : element.Value / 20
        })
        commit('setLoading', false)
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
