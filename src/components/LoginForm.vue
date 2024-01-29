<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="../images/HiveLogo.png"
        class="profile-img-card"
      />
      <div id="loginBox">
        <form v-on:submit.prevent="handleLogin">
          <div class="input-form-box">
            <label for="username">아이디 </label>
            <input id="username" type="text" v-model="user.username" />
          </div>
          <div class="input-form-box">
            <label for="password">비밀번호 </label>
            <input id="password" type="password" v-model="user.password" />
          </div>
          <div class="button-login-box">
            <button
              type="submit"
              class="btn btn-outline-warning"
              style="width: 100%; color: black"
              text-align:
              center
              @click="handleLogin"
            >
              로그인
            </button>
          </div>
          <img
            src="../images/kakao_login_medium_wide.png"
            alt="카카오 계정으로 회원가입"
            @click="kakaoLogin"
            class="kakao-login-button"
          />

          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </form>
      </div>
    </div>
    <AlertModal
      :is-visible="isModalVisible"
      :message="modalMessage"
      @closeModalAndRedirect="closeModalAndRedirect"
    />
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";
import authService from "@/services/auth.service";
import userService from "@/services/user.service";

export default {
  name: "login-form",

  components: {
    AlertModal,
  },

  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      message: "",
      isModalVisible: false,
      modalMessage: "",
      redirectPath: "/",
      userId: "",
    };
  },

  created() {
    if (authService.isLoggedIn()) {
      this.$router.push(`/profile`);
    }
  },

  methods: {
    handleLogin() {
      authService
        .login(this.user)
        .then((response) => {
          console.log(response.status);
          if (response.status >= 200 && response.status < 300) {
            // 회원가입 성공 시 모달 표시
            // this.userId = userService.getUserInfo()["userId"];
            this.userId = userService.getUserInfo()["userId"];
            console.log(userService.getUserInfo());
            console.log(this.userId);
            this.showModal("로그인에 성공하셨습니다.", `/profile`);
          } else {
            console.error("서버 응답 오류:", response.data);
          }
        })
        .catch((error) => {
          // 에러 핸들링 및 모달 표시
          this.showModal("로그인 오류", "/home");
          console.error("로그인 오류:", error);
        });
    },

    showModal(message, redirectPath) {
      // 모달을 표시하고 메시지 설정
      this.isModalVisible = true;
      this.modalMessage = message;
      this.redirectPath = redirectPath;
    },

    closeModalAndRedirect() {
      // 모달 닫기
      this.isModalVisible = false;
      if (this.userId) {
        this.$router.push({
          path: this.redirectPath,
          params: {
            userId: this.userId,
          },
        });
        window.location.reload();
      } else {
        this.$router.push({ path: this.redirectPath });
      }
    },

    kakaoLogin() {
      authService.kakaoLogin();
    },
  },
};
</script>

<style scoped>
.profile-img-card {
  width: 400px;
  object-fit: cover; /* 이미지 비율을 유지하면서 컨테이너를 완전히 채움 */
}
.card-container {
  display: flex; /* Flexbox 레이아웃 사용 */
  width: 100%; /* 컨테이너의 너비 (필요에 따라 조정 가능) */
  margin: auto; /* 자동 마진으로 페이지 중앙에 위치 */
  max-width: 800px; /* 최대 너비 설정 */
  flex-direction: column; /* 항목들을 세로로 나열 */
  align-items: center; /* 세로 방향에서 중앙 정렬 */
  justify-content: center; /* 가로 방향에서 중앙 정렬 */
  text-align: center; /* 텍스트를 가운데 정렬 */
  margin-top: 100px; /* 컨테이너 위쪽에 여백 추가 */
  border: 1px solid black; /* 테두리 추가 */
  border-radius: 10px; /* 컨테이너 모서리를 10px 둥글게 처리 */
}
form > div {
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 요소들 사이에 공간을 균등하게 분배 */
  align-items: center; /* 세로 방향에서 요소들을 중앙 정렬 */
  width: 100%; /* div의 너비를 폼의 너비에 맞춤 */
  margin-bottom: 30px; /* 각 입력 필드와 버튼 사이의 간격 */
}
label {
  width: 30%; /* label의 너비 (필요에 따라 조정) */
  text-align: left; /* 텍스트를 왼쪽 정렬 */
}
input {
  width: 50%; /* input의 너비 (필요에 따라 조정) */
  border: 0.9px solid black; /* 테두리 추가 */
  border-radius: 5px;
  height: 30px;
}

button {
  width: 100px; /* 버튼의 너비를 설정 (필요에 따라 조정) */
  margin-top: 10px; /* 버튼 아래쪽에 30px의 여백 추가 */
}

.kakao-login-button{
  margin-bottom: 30px;
}
</style>