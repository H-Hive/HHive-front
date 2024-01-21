<template>
    <div class="notification-modal">
      <div class="modal-content">
        <h3 class="notification-title">
        <strong><v-icon><font-awesome-icon icon="bell" /></v-icon>알림</strong>
        </h3>
        <div class="line">
        </div>
        <div>
        <span class="close" @click="closeModal" style="position: absolute; top: 0%; right: 3%; cursor: pointer;">&times;</span>
        <div>
          <template v-for="(notificationData, index) in notificationDatas" :key="index">
            <div>
                <NotificationForm :notificationData="notificationData" />
            </div>
            <div class="space"></div>
            </template>
        </div>  
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import authService from "@/services/auth.service";
  import NotificationForm from './NotificationForm.vue';
  import NotificationService from "@/services/notification.service";

  export default {
    data(){
        return{
            notificationDatas:"",
        }
    }
    ,
    components:{
        NotificationForm,
    },
    mounted(){
        if(!authService.isLoggedIn()){
            this.$router.push("/login");
        }else{
            NotificationService
            .getAllNotifications()
            .then((Response)=>{
                this.notificationDatas = Response.data["payload"];
                console.log(this.notificationDatas);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    },

    methods: {
      closeModal() {
        // 부모 컴포넌트에 이벤트를 보내 모달을 닫도록 합니다.
        this.$emit("close-modal");
      },
    },
  };
  </script>
  
  <style scoped>
  .notification-modal {
    position: fixed;
    z-index: 1;
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
    top:-23.7%;
    left: 21%;
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
  .space{
    height: 20px;
  }
  .line {
  border-bottom: 1px solid #777777; 
}
.notification-title{
  text-align: center;
}
  </style>
  