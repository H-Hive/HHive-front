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
        <div class="button-container">
          <button @click="closeModalAndReload" class="btn btn-outline-dark">수정</button>
          <button @click="justCloseModal" class="btn btn-outline-dark">취소</button>
        </div>
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
  width: 60%; /* 모달의 너비 */
  max-width: 500px; /* 모달의 최대 너비 */
  padding: 50px;
}

label {
  width: 100%; /* label의 너비 (필요에 따라 조정) */
}
input {
  width: 100%; /* input의 너비 (필요에 따라 조정) */
  border: 1px solid black; /* 테두리 추가 */
  border-radius: 5px;
  margin-bottom: 15px;
}
.button-container {
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: center; /* 가로 방향에서 버튼들을 중앙 정렬 */
  align-items: center; /* 세로 방향에서 버튼들을 중앙 정렬 */
  margin-top: 15px; /* 버튼 컨테이너 상단에 여백 추가 */
}

.modal-content button {
  width: 30%; /* 버튼의 너비 설정 */
  margin: 5px; /* 버튼 사이의 간격 설정 */
}
</style>