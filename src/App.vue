<template>
  <v-app>
    <AppBar />
    <SideBar v-if="currentUser" />
    <router-view></router-view>
  </v-app>
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
.v-main {
  --v-layout-top: 0px;
  margin-top: -150px;
}
</style>