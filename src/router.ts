import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/:hash?',
      name: 'home',
      component: Home,
      props: true,
      meta: {
        title: 'alt:V / NativeDB'
      }
    }
  ],
});
