<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <p>알림 내용을 작성해주세요</p>
        <textarea class="content" v-model="notificationMessage" id="notificationMessage"></textarea>
        <div class="button-container">
          <button @click="sendNotification" type="button" class="btn btn-outline-dark">전송</button>
          <button @click="closeModal" type="button" class="btn btn-outline-dark">취소</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import notificationService from '@/services/notification.service';
  
  export default {
    props: {
      isVisible: Boolean,
      id: {
        type: Number, 
      },
      type: {
        type: String, 
        default: "hive", 
      },
    },
    data() {
      return {
        notificationMessage: "",
        modalMessage: "",
        errorMessage: "",
      };
    },
    methods: {
      sendNotification() {
        if (!this.notificationMessage) {
        this.errorMessage = '알림 내용을 입력해주세요';
        return;
      }
        notificationService.sendNotification(this.notificationMessage, this.id, this.type)
        .then((response) => {
        this.modalMessage = response.data.message;
        this.$emit('send-Success',this.modalMessage);
      })
      .catch((error) => {
        console.error(error);
        this.errorMessage = error.response.data.message;
      });
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
    height: 300px;
    max-width: 500px; 
    text-align: center; 
  }

  .content{
    border: 1px solid grey;
    border-radius: 5px;
    height: 150px;
    margin-bottom: 20px;
  }
  
  .modal-content button {
    width: 20%;
    padding: 5px;
    margin: auto;
    margin-top: 7px;
  }
  
  .button-container button {
    margin: 0 5px; 
  }

  </style>
  