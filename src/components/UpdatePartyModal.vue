<template>
  <div class="createparty-modal">
    <div class="modal-content">
      <span
        class="close"
        @click="closeModal"
        style="position: absolute; top: 0%; right: 2.5%; cursor: pointer"
        >&times;</span
      >
      <div>
        <h2>파티 수정</h2>
        <div class="line"></div>
        <div class="content-top">
          <div>
            <label for="partyTitle">파티 이름:</label>
            <input type="text" id="partyTitle" v-model="partyData.title" />
          </div>
          <div>
            <label for="partyContent">파티 내용:</label>
            <input type="text" v-model="partyData.content" />
          </div>
          <div>
            <label for="partyYear">연도 (2024 ~ ):</label>
            <input type="text" v-model="partyData.year" />
          </div>
          <div>
            <label for="partyMonth">월 (1 ~ 12):</label>
            <input type="text" v-model="partyData.month" />
          </div>
          <div>
            <label for="partyDay">일 (1 ~ 31):</label>
            <input type="text" v-model="partyData.day" />
          </div>
          <div>
            <label for="partyHours">시 (0 ~ 23):</label>
            <input type="text" v-model="partyData.hours" />
          </div>
          <div>
            <label for="partyMinutes">분 (0 ~ 59):</label>
            <input type="text" v-model="partyData.minutes" />
          </div>
        </div>

        <div class="content-bottom">
          <p :class="{ hidden: !errorMessage, red: errorMessage }">
            {{ errorMessage }}
          </p>
          <button @click="updateParty" class="btn btn-outline-dark">
            파티 수정
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import partyService from "@/services/party.service";

export default {
  props: {
    id: {
      type: Number,
    },
  },
  data() {
    return {
      partyData: {},
      modalMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    updateParty() {
      // if (!this.partyTitle) {
      //   this.errorMessage = "파티 이름을 입력해주세요.";
      //   return;
      // }
      partyService
        .updateParty(this.partyData, this.id)
        .then((response) => {
          this.modalMessage = response.data.message;
          this.$emit("update-Success", this.modalMessage);
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = error.response.data.message;
        });
    },
    closeModal() {
      // 모달이 닫힐 때 이벤트 발생
      this.$emit("modal-Closed");
    },
  },
};
</script>
  
  <style scoped>
.createparty-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 500px; /* 모달의 너비 조절 */
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

.content-top {
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 요소들 사이에 공간을 균등하게 분배 */
  align-items: center; /* 가로 방향에서 요소들을 중앙 정렬 */
  padding: 20px;
  height: 400px;
  flex-direction: column;
  margin-top: 10px;
}

.content-top > div {
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 요소들 사이에 공간을 균등하게 분배 */
  align-items: center; /* 가로 방향에서 요소들을 중앙 정렬 */
  width: 90%; /* div의 너비를 폼의 너비에 맞춤 */
}

.content-top input {
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 50%;
  height: 30px;
}

.content-bottom {
  width: 100%;
  margin-top: 70px;
  margin-bottom: 10px;
}

.hidden {
  margin-top: 40px;
}
.red {
  color: red;
}
</style>