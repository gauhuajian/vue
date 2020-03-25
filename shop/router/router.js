import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '../src/components/login/Login.vue'

// 路由懒加载
const Home = () => import('../src/components/home/Home.vue')
const Users = () => import('../src/components/users/Users.vue')
const Roles = () => import('../src/components/roles/Roles.vue')
const Rights = () => import('../src/components/rights/Rights.vue')
const Categories = () => import('../src/components/categories/Categories.vue')
const Goods = () => import('../src/components/goods/Goods.vue')
const GoodsAdd = () => import('../src/components/goods/Goods-add.vue')
Vue.use(VueRouter)

/* eslint-disable */
const router = new VueRouter({
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
          path: '/users/:page?',
          name: 'users',
          component: Users
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categories
        },
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/goods-add',
          name: 'goods-add',
          component: GoodsAdd
        }

      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
