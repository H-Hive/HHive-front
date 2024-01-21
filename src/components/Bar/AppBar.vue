<template>
  <v-app-bar fixed v-if="!isLoggedIn">
    <v-app-bar-title style="cursor: pointer" @click="$router.push('/')"
      >HHive</v-app-bar-title
    >
    <v-icon> <font-awesome-icon icon="user-plus" /></v-icon>
    <router-link to="/register">
      <v-list-item> 회원가입</v-list-item>
    </router-link>
    <v-icon><font-awesome-icon icon="sign-in-alt" /></v-icon>
    <router-link to="/login">
      <v-list-item :to="login">로그인</v-list-item>
    </router-link>
  </v-app-bar>

  <v-app-bar fixed v-else>
    <v-app-bar-title style="cursor: pointer" @click="$router.push('/')"
      >HHive</v-app-bar-title
    >
    <v-icon> <font-awesome-icon icon="magnifying-glass" /></v-icon>
    <router-link to="/hives">
      <v-list-item>새로운 하이브 찾기</v-list-item>
    </router-link>
    <v-icon><font-awesome-icon icon="sign-in-alt" /></v-icon>
    <button>
      <v-list-item @click="logout">로그아웃</v-list-item>
    </button>
  </v-app-bar>
</template>

<script>
import userService from "@/services/user.service";
import authService from "@/services/auth.service";

export default {
  computed: {
    isLoggedIn() {
      return userService.getUserInfo();
    },
  },
  methods: {
    logout() {
      return authService.logout();
    },
  },
};
</script>