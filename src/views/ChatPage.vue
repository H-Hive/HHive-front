<template>
  <div id="chat-box">
    <div id="message-container" ref="messageContainer">
      <div
        v-for="(item, idx) in recvList"
        :key="idx"
        :class="{ 'sent-message': isSentMessage(item) }"
        class="message-box"
      >
        <p :class="{ 'content-sent': isSentMessage(item) }">
          {{ item.message }}
        </p>
        <div class="info-container">
          <span :class="{ 'username-sent': isSentMessage(item) }">{{
            item.username
          }}</span>
          <span :class="{ 'time-sent': isSentMessage(item) }">{{
            item.createdAt
          }}</span>
        </div>
      </div>
    </div>
    <div id="input-container">
      <input
        v-model="message"
        type="text"
        @keyup="sendMessage"
        id="input-box"
        placeholder="메시지를 입력하세요"
      />
      <button @click="sendMessageByClick" id="send-button">전송</button>
    </div>
    <button @click="leaveChatRoom" id="leave-button">채팅방 나가기</button>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import axios from "axios";
import userService from "@/services/user.service";

export default {
  data() {
    return {
      username: "",
      message: "",
      recvList: [],
      // serverURL: "http://localhost:8080",
      serverURL: "https://hhive.shop",
    };
  },

  props: ["hiveId"],

  //생성 시 소켓 연결 시도
  created() {
    this.connect();
    this.getPreviousMessages();
    this.username = userService.getUserInfo()["username"];
  },

  mounted() {
    this.scrollToBottom();
  },

  //페이지 떠날 때 구독 취소
  beforeRouteLeave() {
    this.stompClient.unsubscribe(`/sub/chat/${this.hiveId}`);
    this.stompClient.disconnect(); // 추가된 부분
    this.stompClient = null; // 추가된 부분
  },

  methods: {
    getPreviousMessages() {
      axios
        .get(this.serverURL + "/api/chat-messages/hives" + `/${this.hiveId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((response) => {
          console.log("이전 메시지 로딩중: ");
          console.log(response.data["payload"]);

          const messages = response.data["payload"];
          for (const key in messages) {
            this.recvList.push(messages[key]);
          }
          // this.recvList.push(JSON.parse(res.body));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    sendMessage(e) {
      if (e.keyCode === 13 && this.username !== "" && this.message !== "") {
        this.send();
        this.message = "";
      }
    },

    sendMessageByClick() {
      if (this.username !== "" && this.message !== "") {
        this.send();
        this.message = "";
      }
    },

    send() {
      console.log("Send message:" + this.message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          hiveId: this.hiveId,
          username: this.username,
          message: this.message,
        };
        this.stompClient.send("/pub/chat", JSON.stringify(msg), {});
      }
    },

    connect() {
      let socket = new SockJS(this.serverURL + "/ws");

      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${this.serverURL}`);

      this.stompClient.connect(
        {},
        (frame) => {
          // 소켓 연결 성공
          this.connected = true;
          console.log("소켓 연결 성공", frame);
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe(`/topic/chat/${this.hiveId}`, (res) => {
            console.log("구독으로 받은 메시지 입니다.", res.body);

            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.recvList.push(JSON.parse(res.body));
          });
        },
        (error) => {
          // 소켓 연결 실패
          console.log("소켓 연결 실패", error);
          this.connected = false;
        }
      );
    },

    isSentMessage(message) {
      return message.username === this.username;
    },

    leaveChatRoom() {
      this.$router.push(`/hive/${this.hiveId}`);
    },

    scrollToBottom() {
      const container = this.$refs.messageContainer;
      console.log("scrollHeight:", container.scrollHeight);
      console.log("scrollTop:", container.scrollTop);
      container.scrollTop = container.scrollHeight;
    },
  },

  watch: {
    recvList() {
      // recvList가 변경될 때마다 스크롤을 최하단으로 이동
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
};
</script>

<style scoped>
#chat-box {
  margin-top: 100px;
  margin-left: 150px;
}

#message-container {
  overflow-y: auto;
  max-height: 500px;
}

.message-box {
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
  position: relative;
  background-color: #e8e8e8;
  max-width: 70%;
  word-wrap: break-word;
}

.content {
  font-size: 16px;
  margin-bottom: 5px;
}

.info-container {
  display: flex;
  justify-content: space-between;
}

.username {
  font-size: 12px;
  color: #555;
}

.time {
  font-size: 10px;
  color: #aaa;
}

.sent-message {
  align-self: flex-end;
  background-color: #007bff; /* 보낸 메시지 배경색상 추가 */
  color: white; /* 텍스트 색상 변경 */
  margin-left: auto;
}

#input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

#input-box {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
}

#send-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
}

#leave-button {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
}

.content-sent {
  color: white; /* 보낸 메시지 텍스트 색상을 흰색으로 변경 */
}

.username-sent {
  font-size: 12px;
  color: white; /* 보낸 메시지 유저 이름 색상을 흰색으로 변경 */
}

.time-sent {
  font-size: 10px;
  color: white; /* 보낸 메시지 시간 색상을 흰색으로 변경 */
}
</style>