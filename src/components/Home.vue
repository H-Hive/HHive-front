<template>
  <div class="container">
    <header class="jumbotron">
      <h3>MainPage</h3>
    </header>
    <router-link to="/hive" class="nav-link">
      Go To Hive. 이거 누르면 모든 하이브들 조회됨
    </router-link>

    <!-- 로그인 되어있다면 내가 가입한 하이브들 보여주기 -->
    <MyHivePage v-if="loggedIn" />
    
    <!-- 로그인되어있지 않다면 로고와 회원가입 링크 보여주기 -->
    <router-link to="/register" v-if="!loggedIn">
      회원가입으로 HHive 시작하기 (로그인 안된 상황에서 떠야함)
    </router-link>
  </div>
</template>

<script>
// import UserService from "../services/user.service";
import MyHivePage from "../views/MyHivePage.vue";
import authService from "../services/auth.service.js";

export default {
  name: "home-form",
  data() {
    return {
      content: "",
      loggedIn: "",
    };
  },

  components: {
    MyHivePage
  },

  mounted() {
    this.loggedIn = authService.isLoggedIn();
    // UserService.getPublicContent().then(
    //   (response) => {
    //     this.content = response.data;
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
};
</script>