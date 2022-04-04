import Vue from "vue";
import VueRouter from "vue-router";
// import Main from "../views/Main.vue";
import MainLayout from "../components/layout/MainLayout.vue";
import BoardList from "../views/BoardList.vue";
import BoardInfo from "../views/BoardInfo.vue";
import BoardInfoHM from "../views/BoardInfoHM.vue";
import BoardInfo2 from "../views/BoardInfo2.vue";
import BoardInfo4 from "../views/BoardInfo4.vue";
import BoardInfo5 from "../views/BoardInfo5.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "main",
  //   component: Main,
  // },
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    children: [
      // {
      //   path: "/",
      //   name: "boardList",
      //   component: BoardList,
      // },
      {
        path: "/",
        name: "login",
        component: Login,
      },
      {
        path: "/list",
        name: "boardList",
        component: BoardList,
      },
      {
        path: "/boardInfo/:boardId",
        name: "boardInfo",
        component: BoardInfo,
        props: true,
      },
      {
        path: "/boardInfoHM/:boardId",
        name: "boardInfoHM",
        component: BoardInfoHM,
        props: true,
      },
      {
        path: "/BoardInfo2/:boardId",
        name: "boardInfo2",
        component: BoardInfo2,
        props: true,
      },
      {
        path: "/BoardInfo4/:boardId",
        name: "boardInfo4",
        component: BoardInfo4,
        props: true,
      },
      {
        path: "/BoardInfo5/:boardId",
        name: "boardInfo5",
        component: BoardInfo5,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
