// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'

/* eslint-disable */
// 处理axios
import axios from 'axios'

// 配置地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
// 配置引用问题
Vue.prototype.$axios = axios
//使用拦截器配置 tokan
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config;
}, function (error) {
  return Promise.reject(error);
});


Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
