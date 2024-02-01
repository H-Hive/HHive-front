import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import SignupPage from "./views/SignupPage.vue";
import AllHivePage from "./views/AllHivePage.vue";
import HivePage from "./views/HivePage.vue";
import ProfilePage from "./views/ProfilePage.vue";
import PartyPage from "./views/PartyPage.vue"
import MyHivePage from "./views/MyHivePage.vue"
import KakaoPage from "./views/KakaoPage.vue"
import HivePartyPage from "./views/HivePartyPage.vue"
import authService from "./services/auth.service";
import MyPartyPage from "./views/MyPartyPage.vue"
// lazy-loaded
// const Profile = () => import("./components/Profile.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    afterEach(to, from, next) {
      if(from.path === '/kakao-login') {
        window.location.reload();
      } else {
        next();
      }
    }
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
    // path: "/profile/:userId",
    path: "/profile",
    // lazy-loaded
    component: ProfilePage
  },
  {
    path: "/hives",
    component: AllHivePage,
  },
  { 
    path: "/hive/:id",
    component: HivePage,
    props: true
  },
  {
    path: "/party/:hiveId/:partyId",
    component: PartyPage,
    props: true
  },
  {
    path: "/myhives",
    component: MyHivePage
  },
  {
    path: "/myparties",
    component: MyPartyPage
  },
  {
    path: "/kakao-login",
    component: KakaoPage,
  },
  {
    path: "/hive/:hiveId/parties",
    component: HivePartyPage,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//다른 페이지로 이동하기 전 로그인 여부 확인
router.beforeEach((to, from, next) => {
  const publicPages = ['/','/login', '/register', '/home', '/kakao-login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = authService.isLoggedIn() ? true : false;

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;