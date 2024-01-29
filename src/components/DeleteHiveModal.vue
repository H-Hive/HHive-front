<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <p>정말로 모임을 삭제 하시겠습니까?</p>
        <div class="button-container">
        <button @click="deleteHiveAndRedirect" type="button" class="btn btn-outline-dark">삭제</button>
        <button @click="closeModal" type="button" class="btn btn-outline-dark">취소</button>
      </div>
      </div>
    </div>
  </template>
  
  <script>
import hiveService from '@/services/hive.service';

  export default {
    props: {
      isVisible: Boolean,
      id: {
      type: Number, 
    },
    },
    methods: {
      deleteHiveAndRedirect() {
        hiveService.deleteHive(this.id)
        this.$emit("delete-Success");
      },
      closeModal() {
        this.$emit("closeModal");
      },
    },
  };
  </script>
  
  <style scoped>
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
    width: 60%;
    max-width: 500px; 
    text-align: center; 
  }

  .button-container button {
    margin: 10px;
    width: 80px;
  }

  </style>