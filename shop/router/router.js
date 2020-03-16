import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '../src/components/login/Login.vue'
import Home from '../src/components/Home/Home.vue'

Vue.use(VueRouter)
/* eslint-disable */
const router = new VueRouter({
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})

export default router
