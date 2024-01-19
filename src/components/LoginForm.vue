<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form v-on:submit.prevent="handleLogin">
        <div>
          <label for="username">아이디: </label>
          <input id="username" type="text" v-model="user.username" />
        </div>
        <div>
          <label for="password">비밀번호: </label>
          <input id="password" type="password" v-model="user.password" />
        </div>
        <button type="submit">로그인</button>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
    <AlertModal
      :is-visible="isModalVisible"
      :message="modalMessage"
      @closeAndRedirect="closeModalAndRedirect"
    />
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";
import authService from "@/services/auth.service";

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
    };
  },

  created() {
    if (authService.isLoggedIn()) {
      this.$router.push("/profile");
    }
  },

  methods: {
    handleLogin() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            // 회원가입 성공 시 모달 표시
            this.showModal("로그인에 성공하셨습니다.", "/profile");
          } else {
            console.log(response);
            console.log(response.status);
            console.error("서버 응답 오류:", response.data);
          }
        })
        .catch((error) => {
          // 에러 핸들링 및 모달 표시
          this.showModal("회원가입 오류", "/home");
          console.error("회원가입 오류:", error);
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
      this.$router.push({ path: this.redirectPath });
      window.location.reload();
    },
  },
};
</script>

<style scoped>
</style>