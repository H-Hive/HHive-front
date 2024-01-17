import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Profile from "./components/Profile.vue"
import AllHivePage from "./views/AllHivePage.vue"
import Cookies from "js-cookie";
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
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/hive",
    component: AllHivePage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//라우팅하기 전 유저정보 토큰이 존재하는지 확인
let userInfoCookieName = 'userinfo';

function isUserInfoCookieExist() {

  return Cookies.get(userInfoCookieName);
}

//다른 페이지로 이동하기 전 로그인 여부 확인
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = isUserInfoCookieExist() ? true : false;

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;