import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Home from './views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/:hash?',
    name: 'home',
    component: Home,
    meta: {
      title: 'alt:V / NativeDB'
    }
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router