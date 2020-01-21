import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'LatestMovie',
  component: () => import('../views/LatestMovie.vue')
},
{
  path: '/movie/:id',
  name: 'Movie',
  component: () => import('../views/Movie.vue')
},
{
  path: '/search/:name',
  name: 'SearchMovie',
  props: true,
  component: () => import('../views/SearchMovie.vue')
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
