<template>
  <div class="createparty-modal">
    <div class="modal-content">
      <span
        class="close"
        @click="closeModal"
        style="position: absolute; top: 0%; right: 2.5%; cursor: pointer"
        >&times;</span
      >
      <div>
        <h2>인증코드 입력</h2>
        <div class="line"></div>
        <div>이메일 : {{ this.email }}</div>
        <label for="verificationCode">인증코드</label>
        <input type="text" id="verificationCode" v-model="verificationCode" />

        <p :class="{ hidden: !errorMessage, red: errorMessage }">
          {{ errorMessage }}
        </p>
        <button @click="sendVerificationCode" class="btn btn-outline-dark">
          제출
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import authService from "@/services/auth.service";

export default {
  props: ["email"],

  data() {
    return {
      verificationCode: "",
      modalMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    sendVerificationCode() {
      authService
        .sendVerificationCode(this.email, this.verificationCode)
        .then((response) => {
          this.modalMessage = response.data.message;
          this.$emit("verification-Success", this.modalMessage);
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = error.response.data.message;
        });
    },
    closeModal() {
      // 모달이 닫힐 때 이벤트 발생
      this.$emit("modal-Closed");
    },
  },
};
</script>
  
  <style scoped>
.createparty-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 300px; /* 모달의 너비 조절 */
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-content {
  text-align: center;
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

.line {
  border-bottom: 1px solid #000;
  margin-bottom: 15px;
}

.btn {
  margin-top: 20%;
}
.hidden {
  margin-top: 40px;
}
.red {
  color: red;
}
</style>