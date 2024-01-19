<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">아이디: </label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input id="password" type="password" v-model="password" />
    </div>
    <div>
      <label for="checkPassword">비밀번호 확인: </label>
      <input id="checkPassword" type="password" v-model="checkPassword" />
    </div>
    <div>
      <label for="email">이메일: </label>
      <input id="email" type="email" v-model="email" />
    </div>
    <div>
      <label for="description">자기소개: </label>
      <input id="description" type="text" v-model="description" />
    </div>

    <button type="submit">회원가입</button>

    <!-- 모달 사용 -->
  </form>
  <AlertModal
    :is-visible="isModalVisible"
    :message="modalMessage"
    @closeAndRedirect="closeModalAndRedirect"
  />
</template>

<script>
import axios from "axios";
import AlertModal from "@/components/AlertModal.vue";

export default {
  data() {
    return {
      // 폼에 필요한 데이터들을 초기화
      username: "",
      password: "",
      checkPassword: "",
      email: "",
      description: "",
      isModalVisible: false,
      modalMessage: "",
      redirectPath: "/",
    };
  },
  methods: {
    submitForm() {
      const url = "/api/users/signup";
      const data = {
        username: this.username,
        password: this.password,
        checkPassword: this.checkPassword,
        email: this.email,
        description: this.description,
      };

      axios
        .post(url, data)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            // 회원가입 성공 시 모달 표시
            this.showModal("회원가입이 성공했습니다.", "/");
          } else {
            console.error("서버 응답 오류:", response.status);
          }
        })
        .catch((error) => {
          // 에러 핸들링 및 모달 표시
          this.showModal("회원가입 오류");
          console.error("회원가입 오류:", error);
        });
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

<style>
</style>