// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Login from './views/auth/Login'
import UserInfo from './views/auth/UserInfo'
import Ordering from './views/food/Ordering'

import 'vue-layer-mobile/need/layer.css'
import layer from 'vue-layer-mobile'
Vue.use(layer)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/ordering',
    component: Ordering
  },

]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app-box')

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
