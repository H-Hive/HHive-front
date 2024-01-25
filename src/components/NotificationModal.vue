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
        <div class="notification-box">
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
    z-index: 1000;
    width: 100%;
    height: 100%;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    width: 25%;
    position: fixed; /* 요소를 페이지 내에서 고정된 위치에 배치 */
    top: 70px; /* 상단으로부터 20px 떨어진 위치에 배치 */
    right: 60px; /* 오른쪽으로부터 20px 떨어진 위치에 배치 */
  }

  .notification-box{
    max-height: 600px; /* 최대 높이 설정 */
    overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
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
  border-bottom: 1px solid black;
}
.notification-title{
  text-align: center;
}
  </style>
  