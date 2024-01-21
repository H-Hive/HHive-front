<template>
  <!-- <div id="app" class="mainbody"> -->
  <!-- <nav class="navbar navbar-expand navbar-white bg-white">
      <router-link to="/home" class="nav-brand"> HHive </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> 회원가입
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> 로그인
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logout">
            <font-awesome-icon icon="sign-out-alt" /> 로그아웃
          </a>
        </li>
      </div>
    </nav> -->
  <div id="app">
    <v-app>
      <button  class="custom-button">
            <font-awesome-icon icon="bell" /> 알림
          </button>
      <AppBar>
  
      </AppBar>
      <SideBar v-if="currentUser" />
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import SideBar from "./components/Bar/SideBar.vue";
import AppBar from "./components/Bar/AppBar.vue";
import authService from "./services/auth.service";
import userService from "./services/user.service";

export default {
  components: { SideBar, AppBar },
  computed: {
    currentUser() {
      return userService.getUserInfo();
    },
  },
  methods: {
    logout() {
      authService.logout();
      this.$router.push("/home");
    },
  },
};
</script>
<style>
.mainbody {
  width: 100%;

  background-image: url("images/HiveBackground.png");
  background-position: center;
  background-size: cover;
}
.test {
  background-color: black;
}
</style>