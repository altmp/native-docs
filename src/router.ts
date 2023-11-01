import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./views/AppHome.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:hash?",
      name: "home",
      component: AppHome,
      props: true,
      meta: {
        title: "alt:V / NativeDB",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const hashRedirect = /#\/(.*)$/.exec(to.fullPath);
  if (hashRedirect) {
    const path = hashRedirect[1];
    return next({ path: `/${path}` });
  } else {
    return next();
  }
});

export default router;
