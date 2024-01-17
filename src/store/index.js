// // src/router/index.js

// import HomePage from '../views/HomePage.vue';
// import LoginPage from '../views/LoginPage.vue';
// import SignupPage from '../views/SignupPage.vue';
// import {createWebHistory, createRouter} from 'vue-router';

// const routes = [
//   {
//     path: '/',
//     name: 'HomePage',
//     component: HomePage
//   },
//   {
//     path: '/login',
//     name: 'LoginPage',
//     component: LoginPage
//   },
//   {
//     path: '/signup',
//     name: 'SignupPage',
//     component: SignupPage
//   },
// ];

// export const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;

import { createStore } from "vuex";
import { auth } from "./auth.module";

const store = createStore({
  modules: {
    auth,
  },
});

export default store;
