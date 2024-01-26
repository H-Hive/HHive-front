<template>
    <div class="createhive-modal">
      <div class="modal-content">
        <span class="close" @click="closeModal" style="position: absolute; top: 0%; right: 2.5%; cursor: pointer;">&times;</span>
        <div>
          <!-- 모달 내용을 여기에 추가하세요 -->
          <h2>모임 이름 변경</h2>
          <div class="line"></div>
          <label for="hiveTitle">모임 이름:</label>
          <input type="text" id="hiveTitle" v-model="hiveTitle" />
          <label for="hiveTitle">모임 소개:</label>
          <input type="text" id="hiveIntroduction" v-model="hiveIntroduction" />
          <p :class="{ 'hidden': !errorMessage, 'red': errorMessage }">{{ errorMessage }}</p>
          <button @click="updateHive" class="btn btn-outline-dark">변경 완료</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import hiveService from '@/services/hive.service';
  
  export default {
    props: {
    id: {
      type: Number, 
    },
  },
    data() {
      return {
        hiveTitle: "",
        hiveIntroduction:"",
        modalMessage: "",
        errorMessage: "",
      };
    },
    methods: {
      updateHive() {
        if (!this.hiveTitle) {
          this.errorMessage = '모임 이름을 입력해주세요.';
          return;
        }
        hiveService.updateHive(this.id,this.hiveTitle,this.hiveIntroduction)
        .then((response) => {
          this.modalMessage = response.data.message;
          this.$emit('update-Success',this.modalMessage);
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = error.response.data.message;
        });
    },
      closeModal() {
        // 모달이 닫힐 때 이벤트 발생
        this.$emit('modal-Closed');
      },
    },
  };
  </script>
  
  <style scoped>
  .createhive-modal {
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
  .red{
    color: red;
  }
  </style>