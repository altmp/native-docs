import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Home from './views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/:hash?',
    name: 'home',
    component: Home
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
