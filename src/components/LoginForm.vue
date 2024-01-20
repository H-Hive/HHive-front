<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
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
              type="button"
              class="btn btn-primary btn-xs"
              style="width: 100%"
              text-align:
              center
            >
              로그인
            </button>
          </div>

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
      this.$router.push(`/profile/${userService.getUserInfo()["userId"]}`);
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
          path: `/profile/${this.userId}`,
          // query: { userId: this.userId },
        });
        window.location.reload();
      } else {
        this.$router.push({ path: this.redirectPath });
      }
    },
  },
};
</script>

<style scoped>
#loginBox {
  width: 300px;
  text-align: center;
  background-color: #ffffff;
}

.input-form-box {
  border: 0px solid #ff0000;
  display: flex;
  margin: 10px 10px 10px 10px;
}

.input-form-box > label {
  display: block;
  text-align: left;
  padding-top: 5px;
  min-width: 90px;
}

.button-login-box {
  margin: 10px 10px 10px 10px;
}
</style>