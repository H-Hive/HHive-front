<!-- AlertModal.vue -->

<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="closeModalAndRedirect" class="btn btn-outline-dark">확인</button>
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
    closeModalAndRedirect() {
      this.$emit("closeModalAndRedirect");
    },
  },
};
</script>

<style scoped>
/* 모달 스타일링 */
/*모달 배경*/
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
  text-align: center; /* 텍스트 가운데 정렬 */
}

/* 모달 내부 버튼 스타일링 */
.modal-content button {
  width: 20%; /* 모달의 너비 */
  margin: auto;
  margin-top: 8px;
}

</style>