import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import List from '@/pages/list/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'list',
      component: List
    }
  ]
})
