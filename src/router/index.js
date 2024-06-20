import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuthentication: false,
    },
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   next("/generator");
//   let requiresAuthentication =
//     to.meta.requiresAuthentication != null
//       ? to.meta.requiresAuthentication
//       : true;
//
//   if (!store.state.loggedIn && requiresAuthentication) {
//     next("/login");
//     return;
//   }
//   next();
// });

export default router;
