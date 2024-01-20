// 예, 아니오 선택지가 있는 모달

<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="closeModalAndReload">예</button>
      <button @click="justCloseModal">아니오</button>
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
}
</style>