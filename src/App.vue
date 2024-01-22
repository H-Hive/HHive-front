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
<style scoped>

</style>
