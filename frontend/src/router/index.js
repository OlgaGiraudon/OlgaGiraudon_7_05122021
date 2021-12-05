import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Registration.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
