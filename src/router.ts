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

export default router;
