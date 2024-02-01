<template>
  <v-navigation-drawer expand-on-hover rail fixed>
    <v-list>
      <!-- 프로필 정보 표시 -->
      <v-list-item
          class="profile-container"
          :prepend-avatar="require('@/images/userlogo.png')"
      :title="currentUser.username"
      :subtitle="currentUser.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <router-link to="/profile" class="custom-router-link">
        <v-list-item prepend-icon="mdi-account" class="icon-btn" title="프로필"></v-list-item>
      </router-link>
      <router-link to="/myhives" class="custom-router-link">
        <v-list-item
            prepend-icon="mdi-beehive-outline"
            title="내가 참여한 모임"
            class="icon-btn"
        ></v-list-item>
      </router-link>
      <router-link to="/myparties" class="custom-router-link">
        <v-list-item
          prepend-icon="mdi-party-popper"
          title="내가 참여한 파티"
          class="icon-btn"
        ></v-list-item>
      </router-link>
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

.profile-container {
  margin-top: 20px;
}

.custom-router-link, .custom-router-link:visited, .custom-router-link:hover, .custom-router-link:active {
  text-decoration: none;
}

.icon-btn{
  color: #434343;
}

</style>
