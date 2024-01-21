<template>
    <div class="notification-modal">
      <div class="modal-content">
        <span class="close" @click="closeModal" style="position: absolute; top: 0%; right: 2.5%; cursor: pointer;">&times;</span>
        <div>
          <!-- 모달 내용을 여기에 추가하세요 -->
          <ul>
            <li v-if="notifications.length > 0">
              <strong>{{ notifications[notifications.length - 1].groupName }}</strong>
              <div class="line"></div>
              {{ notifications[notifications.length - 1].message }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      notifications: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      closeModal() {
        this.$emit("close-modal");
      },
    },
  };
  </script>
  
  <style scoped>
  .notification-modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  
  .modal-content {
    background-color: #ffffff;
    margin: 15% auto;
    padding: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    width: 25%;
    left: 30%;
    top: -24%;
    position: relative;
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
  margin-bottom: 10px; 
}
  </style>
  