// 메인 페이지
// 로그인 되어있다면 내 하이브들과 새로운 하이브 가입하기 버튼이 뜨고
// 로그인 되어있지 않다면 어플리케이션 소개와 사진 + 회원가입 버튼이 뜬다.

<template >
  <!-- 로그인 되어있다면 내가 가입한 하이브들 보여주기 -->
  <div class="body" v-if="isLoggedIn">
    <header class="jumbotron">
      <img class="mainlogo" alt="HTML" src="../images/HiveLogo.png" />
    </header>
    <div class="button-container">
      <button type="button" class="btn btn-warning" >
        <router-link to="/hives" class="nav-link">
          모임 찾으러 가기!!
        </router-link>
      </button>
    </div>

    <div class="content-container">
      <MyHivePage />
    </div>

  </div>

  <!-- 로그인되어있지 않다면 로고와 회원가입 링크 보여주기 -->
  <div class="body" v-if="!isLoggedIn">
    <header class="jumbotron">
      <img class="mainlogo" alt="HTML" src="../images/HiveLogo.png" />
    </header>

    <div></div>
    <br />
    <div class="intro">
      인터넷의 발달로 인해 서로 욕하기 바쁘고 삭막한 세상... 대한민국을 감싸안던
      2002년도의 온기가 그립지 않으십니까.. <br />
      우리 주변(아직 구현 안됐지만) 같은 취미를 가진 사람들을 만나 행복한
      인간생활을 누려보아요...
      <br />
      <span class="intro-main">H-Hive</span>
      와 함께...
    </div>

    <!-- 로그인되어있지 않다면 로고와 회원가입 링크 보여주기 -->
    <router-link to="/register" v-if="!isLoggedIn">
      <v-btn class="fixed-bottom">회원가입으로 HHive 시작하기 </v-btn>
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
      isLoggedIn: "",
    };
  },

  components: {
    MyHivePage,
  },

  mounted() {
    this.isLoggedIn = authService.isLoggedIn();
  },
};
</script>

<style scoped>
.jumbotron {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
}

.content-container {
  display: flex;
  justify-content: center;
  margin-top: 90px;
  margin-bottom: 120px;
}

.mainlogo {
  margin-top: 100px; /* 상단 여백 조정, 필요에 따라 조정 */
  width: 300px;
  object-fit: cover; /* 이미지 비율을 유지하면서 컨테이너를 완전히 채움 */
}

.button-container {
  display: flex;
  justify-content: center; /* 가로 방향에서 중앙 정렬 */
  margin-top: 20px; /* 로고와 버튼 사이의 여백, 필요에 따라 조정 */
}

.body {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 243, 161);
}

.fixed-bottom {
  position: fixed;
  bottom: 40px;
  margin: 30px;
}

.intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.intro-main {
  font-size: 100px;
}
</style>