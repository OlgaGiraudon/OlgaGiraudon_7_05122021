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
    path: '/allMessages',
    name: 'messages',
    component: () => import('../components/MessageList.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
