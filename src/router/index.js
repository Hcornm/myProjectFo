import Vue from 'vue';
import VueRouter from 'vue-router';
// import Main from "../views/Main.vue";
import MainLayout from '../components/layout/MainLayout.vue';
import BoardList from '../views/BoardList.vue';
import BoardInfo from '../views/BoardInfo.vue';
import Login from '../views/Login.vue';
import BoardCreate from '../views/BoardCreate.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "main",
  //   component: Main,
  // },
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      // {
      //   path: "/",
      //   name: "boardList",
      //   component: BoardList,
      // },
      {
        path: '/',
        name: 'login',
        component: Login,
      },
      {
        path: '/list',
        name: 'boardList',
        component: BoardList,
      },
      {
        path: '/BoardInfo/:boardId',
        name: 'boardInfo',
        component: BoardInfo,
        props: true,
      },
      {
        path: '/boardCreate',
        name: 'boardCreate',
        component: BoardCreate,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
