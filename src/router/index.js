import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/auth/Login'
import Ordering from '../views/food/Ordering'
import OrderRecord from '../views/food/OrderRecord'
import Index from '../views/account/Index'
import Card from '../views/account/Card'
import CardRecore from '../views/account/CardRecore'
import Center from '../views/account/Center'
import Recharge from '../views/account/Recharge'
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
      path: '/order-record',
      component: OrderRecord
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
      path: '/account/cardrecord',
      component: CardRecore
    },    
    {
      path: '/account/center',
      component: Center
    },
    {
      path: '/account/recharge',
      component: Recharge
    },

  ]
})
