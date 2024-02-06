<template>
  <v-app-bar class="app-bar" fixed v-if="!isLoggedIn">
    <v-app-bar-title class="title-name" @click="$router.push('/')"
      >H-HIVE 🍯</v-app-bar-title>
    <div class="app-container">
      <v-icon> <font-awesome-icon icon="user-plus" /></v-icon>
      <router-link to="/register" class="custom-router-link">
        <v-list-item> 회원가입</v-list-item>
      </router-link>
      <v-icon><font-awesome-icon icon="sign-in-alt" /></v-icon>
      <router-link to="/login" class="custom-router-link">
        <v-list-item :to="login">로그인</v-list-item>
      </router-link>
    </div>
  </v-app-bar>

  <v-app-bar class="app-bar" fixed v-else>
    <v-app-bar-title class="title-name" @click="$router.push('/')"
      >H-HIVE 🍯</v-app-bar-title>
    <div class="app-container">
      <button @click="openNotificationModal">
        <v-icon><font-awesome-icon icon="bell" /></v-icon>
      </button>
      <NotificationNumBox :value="NotificationCount" />
      <router-link to="/hives" class="custom-router-link">
        <v-list-item class="findbtn">모임 찾기</v-list-item>
      </router-link>
      <v-icon><font-awesome-icon icon="sign-in-alt" /></v-icon>
      <button>
        <v-list-item @click="logout">로그아웃</v-list-item>
      </button>
    </div>
  </v-app-bar>
  <notification-modal
    v-if="showNotificationModal"
    @close-modal="closeNotificationModal"
  />
  <new-notification-modal
    v-if="showNewNotificationModal"
    :notifications="notifications"
    @close-modal="closeNewNotificationModal"
  />
</template>

<script>
import userService from "@/services/user.service";
import authService from "@/services/auth.service";
import NotificationModal from "../NotificationModal.vue";
import NewNotificationModal from "../NewNotificationModal.vue";
import NotificationNumBox from "../NotificationNumBox.vue";
import NotificationService from "@/services/notification.service";

export default {
  data() {
    return {
      showNotificationModal: false,
      notifications: [],
      showNewNotificationModal: false,
      sseRetryDelay: 1000,
      eventSource: null,
      sseSetupCompleted: false,
      NotificationCount: 0,
      isLoggedIn: false,
    };
  },
  methods: {
    logout() {
      this.sseSetupCompleted = false;
      this.closeSSE();
      return authService.logout();
    },
    openNotificationModal() {
      this.closeNewNotificationModal();
      this.showNotificationModal = true;
      this.NotificationCount = 0;
    },
    openNewNotificationModal() {
      this.showNewNotificationModal = true;
      this.setNotCount();
    },
    closeNewNotificationModal() {
      this.showNewNotificationModal = false;
    },
    closeNotificationModal() {
      this.showNotificationModal = false;
      NotificationService.readNotification();
    },
    createEventSource() {
      const userId = userService.getUserId();
      return NotificationService.getEmitter(userId);
    },

    setupSSE() {
      if (userService.getUserInfo()) {
        this.eventSource = this.createEventSource();

        this.eventSource.onmessage = (event) => {
          const notification = JSON.parse(event.data);
          this.notifications.push(notification);
          this.openNewNotificationModal();
        };

        this.eventSource.onerror = (error) => {
          this.closeSSE();
          console.log("알림 재연결", error);
          this.retrySSE();
        };

        this.eventSource.onclose = () => {
          console.log("SSE 연결 종료");
          this.retrySSE();
        };
      }
    },
    closeSSE() {
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
    },
    retrySSE() {
      if (!this.eventSource) {
        setTimeout(() => {
          this.setupSSE();
        }, this.sseRetryDelay);
      }
    },
    setNotCount() {
      NotificationService.getAllNotificationsCount()
        .then((Response) => {
          this.NotificationCount = Response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    NotificationNumBox,
    "notification-modal": NotificationModal,
    "new-notification-modal": NewNotificationModal,
  },
  mounted() {
    if (userService.getUserInfo && !this.sseSetupCompleted) {
      this.setNotCount();
      this.setupSSE();
      this.sseSetupCompleted = true;
    }

    this.isLoggedIn = userService.getUserInfo();
  },
  beforeUnmount() {
    this.closeSSE();
  },
};
</script>
<style scoped>
.app-container {
  display: flex;
  align-items: center;
  margin-right: 5%;
}

.custom-router-link,
.custom-router-link:visited,
.custom-router-link:hover,
.custom-router-link:active {
  text-decoration: none;
  color: black;
}

.findbtn {
  padding: 0px 10px;
  margin: 20px;
  color: black;
  background-color: #ffc944;
  border: 1px solid #ffc944;
  border-radius: 5px;
}

.title-name {
  cursor: pointer;
  color: orange;
  font-size: 30px;
  font-weight: 700;
  position: relative; /* 또는 absolute, fixed 중 선택 */
  left: 5%; /* 왼쪽에서부터의 거리 */
}
</style>