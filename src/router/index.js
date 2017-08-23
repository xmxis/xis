import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/auth/Login'
import Ordering from '../views/food/Ordering'
import Index from '../views/account/Index'
import Card from '../views/account/Card'
import Center from '../views/account/Center'
// import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/ordering',
      component: Ordering
    },
    {
      path: '/account/index',
      component: Index
    },
    {
      path: '/account/card',
      component: Card
    },
    {
      path: '/account/center',
      component: Center
    },

  ]
})
