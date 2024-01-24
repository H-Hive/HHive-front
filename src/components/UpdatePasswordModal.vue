// 패스워드 변경 희망 시 띄워지는 모달. 현재 비밀번호, 희망 비밀번호, 희망 비밀번호 확인 을 입력받으며. 예 아니오 버튼이 있다.

<template>
  <div>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <form @submit.prevent="submitForm">
          <label for="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            v-model="this.password"
            required
          />
          <label for="newPassword">새로운 비밀번호:</label>
          <input
            type="password"
            id="newPassword"
            v-model="this.newPassword"
            required
          />
          <label for="checkNewPassword">새로운 비밀번호 확인:</label>
          <input
            type="password"
            id="checkNewPassword"
            v-model="this.checkNewPassword"
            required
          />
        </form>
        <button @click="closeModalAndReload">제출</button>
        <button @click="justCloseModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";
export default {
  props: {
    isVisible: Boolean,
  },

  data() {
    return {
      password: "",
      newPassword: "",
      checkNewPassword: "",
    };
  },

  methods: {
    closeModalAndReload() {
      const data = {
        password: this.password,
        updatePassword: this.newPassword,
        checkUpdatePassword: this.checkNewPassword,
      };
      const userId = userService.getUserId();
      userService
        .updatePassword(userId, data)
        .then((response) => {
          console.log(response);
          alert("비밀번호를 수정하였습니다");
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    justCloseModal() {
      this.$emit("justCloseModal");
    },
  },
};
</script>

<style scoped>
/* 모달 스타일링 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>