import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./views/AppHome.vue";

const routes = [
  {
    path: "/:hash?",
    name: "home",
    component: AppHome,
    props: true,
    meta: {
      title: "alt:V / NativeDB",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  const hashRedirect = /#\/(.*)$/.exec(to.fullPath);
  if (hashRedirect) {
    console.log(hashRedirect);
    const path = hashRedirect[1];
    console.log(path);
    return next({ path: `/${path}` });
  } else {
    return next();
  }
});

export default router;
