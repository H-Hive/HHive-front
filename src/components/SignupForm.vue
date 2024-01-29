<template>
  <form>
    <div class="title">
      H-HIVE 🍯
    </div>
    <div>
      <label for="username">아이디: </label>
      <input id="username" type="text" v-model="user.username" />
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input id="password" type="password" v-model="user.password" />
    </div>
    <div>
      <label for="checkPassword">비밀번호 확인: </label>
      <input id="checkPassword" type="password" v-model="user.checkPassword" />
    </div>
    <div>
      <label for="email">이메일: </label>
      <input id="email" type="email" v-model="user.email" />
    </div>
    <div>
      <label for="description">자기소개: </label>
      <input id="description" type="text" v-model="user.description" />
    </div>

    <button
      type="button"
      class="btn btn-outline-warning"
      style="color: black"
      @click="submitForm"
    >
      회원가입
    </button>
    <img
      src="../images/kakao_login_medium_wide.png"
      alt="카카오 계정으로 회원가입"
      @click="kakaoLogin"
      class="kakao-login-button"
    />
  </form>

  <AlertModal
    :is-visible="isModalVisible"
    :message="modalMessage"
    @closeModalAndRedirect="closeModalAndRedirect"
  />
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      // 폼에 필요한 데이터들을 초기화
      user: {
        username: "",
        password: "",
        checkPassword: "",
        email: "",
        description: "",
      },
      isModalVisible: false,
      modalMessage: "",
      redirectPath: "/",
    };
  },
  methods: {
    submitForm() {
      console.log("왜안뒈");
      authService
        .signup(this.user)
        .then((response) => {
          // 회원가입 성공 시 모달 표시
          console.log(response);
          this.showModal("회원가입이 성공했습니다.", "/");
        })
        .catch((error) => {
          // 에러 핸들링 및 모달 표시
          this.showModal(error.response.data.message, "/register");
        });
    },

    kakaoLogin() {
      authService.kakaoLogin();
    },

    showModal(message, redirectPath) {
      // 모달을 표시하고 메시지 설정
      this.isModalVisible = true;
      this.modalMessage = message;
      this.redirectPath = redirectPath;
    },
    showFailModal(message) {
      this.isModalVisible = true;
      this.modalMessage = message;
    },
    closeModalAndRedirect() {
      // 모달 닫기
      this.isModalVisible = false;
      this.$router.push({ path: this.redirectPath });
    },
  },
  components: {
    AlertModal,
  },
};
</script>

<style scoped>

.title {
  margin-bottom: 40px;
  color: orange;
  font-weight: 700;
  font-size: 40px;
  position: relative; /* 또는 absolute, fixed 중 선택 */
  left: 25%; /* 왼쪽에서부터의 거리 */
}

form {
  display: flex; /* Flexbox 레이아웃 사용 */
  flex-direction: column; /* 항목들을 세로로 나열 */
  align-items: center; /* 가로 방향에서 중앙 정렬 */
  justify-content: center; /* 세로 방향에서 중앙 정렬 */
  width: 100%; /* 폼의 너비 (필요에 따라 조정) */
  max-width: 500px; /* 최대 너비를 설정하여 너무 넓게 퍼지는 것을 방지 */
  margin: auto; /* 자동 마진으로 페이지 중앙에 위치 */
  margin-top: 150px; /* 컨테이너 위쪽에 50px의 여백 추가 */
  padding: 55px; /* 폼 내부의 여백 */
  border: 1px solid black; /* 테두리 추가 */
  border-radius: 10px; /* 컨테이너 모서리를 10px 둥글게 처리 */
}
form > div {
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 요소들 사이에 공간을 균등하게 분배 */
  align-items: center; /* 가로 방향에서 요소들을 중앙 정렬 */
  width: 100%; /* div의 너비를 폼의 너비에 맞춤 */
  margin-bottom: 30px; /* 각 입력 필드와 버튼 사이의 간격 */
}
label {
  width: 30%; /* label의 너비 (필요에 따라 조정) */
  text-align: left; /* 텍스트를 왼쪽 정렬 */
}
input {
  width: 50%; /* input의 너비 (필요에 따라 조정)  */
  border: 0.9px solid black; /* 테두리 추가 */
  border-radius: 5px;
  height: 30px;
}
button {
  width: 300px; /* 버튼의 너비를 설정 (필요에 따라 조정) */
  margin-top: 30px;
}

.kakao-login-button {
  cursor: pointer; /* 마우스 오버 시 커서를 포인터로 변경 */
  margin-top: 20px; /* 버튼과의 상단 간격 조정 */
}
</style>