// 예, 아니오 선택지가 있는 모달

<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <p>{{ message }}</p>
      <div class="button-container">
        <button @click="closeModalAndReload" class="btn btn-outline-dark">예</button>
        <button @click="justCloseModal" class="btn btn-outline-dark">아니오</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    message: String,
  },
  methods: {
    closeModalAndReload() {
      this.$emit("closeModalAndReload");
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