import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import List from '@/pages/list/list'
import Config from '@/pages/mearConfig/mearConfig'
import comConfig from '@/pages/comConfig/comConfig'

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
    },
    {
      path: '/config',
      name: 'config',
      component: Config
    },
    {
      path: '/comConfig',
      name: 'comConfig',
      component: comConfig
    }
  ]
})
