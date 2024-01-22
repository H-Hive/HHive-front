<template>
  <v-navigation-drawer expand-on-hover rail fixed>
    <v-list>
      <v-list-item prepend-avatar=""
      >{{ currentUser.username }}<br />{{ currentUser.email }}</v-list-item
      >
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <router-link to="/profile">
        <v-list-item prepend-icon="mdi-account" title="프로필"></v-list-item>
      </router-link>
      <router-link to="/myhives">
        <v-list-item
            prepend-icon="mdi-beehive-outline"
            title="내 하이브들"
        ></v-list-item>
      </router-link>
      <!-- <router-link to="/myparties">
        <v-list-item
          prepend-icon="mdi-party-popper"
          title="예정 파티들"
        ></v-list-item>
      </router-link> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import userService from "@/services/user.service";

export default {
  data() {
    return {
      username: "",
      email: "",
    };
  },
  computed: {
    currentUser() {
      return userService.getUserInfo();
    },
  },
};
</script>
<style scoped>
</style>
