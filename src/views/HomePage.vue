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
      <button type="button" class="btn btn-warning">
        <router-link to="/hives" class="nav-link">
          모임 찾으러 가기
        </router-link>
      </button>
    </div>

    <!--
    <div class="content-container">
      <MyHivePage />
    </div>
-->

  </div>

  <!-- 로그인되어있지 않다면 로고와 회원가입 링크 보여주기 -->
  <div class="body" v-if="!isLoggedIn">
    <header class="jumbotron">
      <img class="mainlogo" alt="HTML" src="../images/HiveLogo.png" />
    </header>

    <div></div>
    <br />
    <div class="intro">
      <div>
        H-Hive는 동일한 취미와 관심사를 가진 사람들이 만나 서로의 삶을 더욱
        풍요롭게 할 수 있는 커뮤 니티를 지향 합니다.
      </div>
      <div>
        우리의 삶 속에 새로운 인연을 만들고, 함께 성장하며, 일상에 작은 기쁨을
        더하는 그런 공간.
      </div>
      <div class="info-3">H-Hive와 함께, 새로운 시작을 만나 보세요.</div>
    </div>

    <!-- 로그인되어있지 않다면 로고와 회원가입 링크 보여주기 -->
    <router-link to="/register" v-if="!isLoggedIn" style="text-decoration: none;">
      <v-btn class="btn btn-warning"
             style="
             display: flex;
             width: 50%;
             margin: 50px auto;
             ">
        HHive 시작하기 </v-btn>
    </router-link>
  </div>
</template>

<script>
/*import MyHivePage from "./MyHivePage.vue";*/
import authService from "../services/auth.service.js";

export default {
  name: "home-form",
  data() {
    return {
      isLoggedIn: "",
    };
  },

  components: {
    /*    MyHivePage,*/
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

.intro {
  background-color: white;
  width: 50%;
  margin: 0px auto;
  padding: 20px;
  border: 0.5px solid grey;
  border-radius: 10px;
  color: #51514C;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.intro > div {
  margin: 15px;
}

.info-3 {
  font-size: 25px;
  font-weight: 700;
  color: orange;
}
</style>