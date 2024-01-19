// 메인 페이지
// 로그인 되어있다면 내 하이브들과 새로운 하이브 가입하기 버튼이 뜨고
// 로그인 되어있지 않다면 어플리케이션 소개와 사진 + 회원가입 버튼이 뜬다.

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>MainPage</h3>
    </header>
    <router-link to="/hive" class="nav-link">
      클릭 시 모든 하이브들이 나오는 페이지로 이동
    </router-link>
    <div></div>
    <br />

    <!-- 로그인 되어있다면 내가 가입한 하이브들 보여주기 -->
    <div v-if="loggedIn">로그인 되어있기 않기 때문에 내 하이브들이 뜬다</div>
    <MyHivePage v-if="loggedIn" />

    <!-- 로그인되어있지 않다면 로고와 회원가입 링크 보여주기 -->
    <router-link to="/register" v-if="!loggedIn">
      회원가입으로 HHive 시작하기 (로그인 안된 상황에서 떠야함)
    </router-link>
  </div>
</template>

<script>
import MyHivePage from "./MyHivePage.vue";
import authService from "../services/auth.service.js";

export default {
  name: "home-form",
  data() {
    return {
      loggedIn: "",
    };
  },

  components: {
    MyHivePage,
  },

  mounted() {
    this.loggedIn = authService.isLoggedIn();
  },
};
</script>