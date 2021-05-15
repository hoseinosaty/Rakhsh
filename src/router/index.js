import Vue from "vue";
import VueRouter from "vue-router";
import addUser from "../views/user/add.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "addUser",
    component: addUser,
  },
  {
    path: "/user/add",
    name: "addUser",
    component: addUser,
  },
  {
    path: "/user/list",
    name: "userList",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/list.vue"),
  },
  {
    path: "/user/edit/:id",
    name: "userEdit",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/edit.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
