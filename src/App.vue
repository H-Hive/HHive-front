<template>
  <v-app>
    <AppBar />
    <SideBar v-if="currentUser" />
    <router-view></router-view>
  </v-app>
  <BottomBar></BottomBar>
</template>

<script>
import SideBar from "./components/Bar/SideBar.vue";
import AppBar from "./components/Bar/AppBar.vue";
import authService from "./services/auth.service";
import userService from "./services/user.service";
import BottomBar from "@/components/Bar/BottomBar.vue";

export default {
  components: {BottomBar, SideBar, AppBar },
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
