import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import SignupPage from "./views/SignupPage.vue";
import AllHivePage from "./views/AllHivePage.vue";
import HivePage from "./views/HivePage.vue";
import ProfilePage from "./views/ProfilePage.vue";
import PartyPage from "./views/PartyPage.vue"
import authService from "./services/auth.service";
// lazy-loaded
// const Profile = () => import("./components/Profile.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: SignupPage,
  },
  {
    path: "/profile/:userId",
    // lazy-loaded
    component: ProfilePage,
    props: true,
  },
  {
    path: "/hive",
    component: AllHivePage,
  },
  { 
    path: "/hive/:id",
    component: HivePage,
    props: true
  },
  {
    path: "/party/:id",
    component: PartyPage,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//다른 페이지로 이동하기 전 로그인 여부 확인
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = authService.isLoggedIn() ? true : false;

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;