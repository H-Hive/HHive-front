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
        <label for="partyTitle">파티 이름:</label>
        <input type="text" id="partyTitle" v-model="partyData.title" />
        <label for="partyContent">파티 내용:</label>
        <input type="text" v-model="partyData.content" />
        <label for="partyYear">연도:</label>
        <input type="text" v-model="partyData.year" />
        <label for="partyMonth">월:</label>
        <input type="text" v-model="partyData.month" />
        <label for="partyDay">일:</label>
        <input type="text" v-model="partyData.day" />
        <label for="partyHours">시:</label>
        <input type="text" v-model="partyData.hours" />
        <label for="partyMinutes">분:</label>
        <input type="text" v-model="partyData.minutes" />

        <p :class="{ hidden: !errorMessage, red: errorMessage }">
          {{ errorMessage }}
        </p>
        <button @click="updateParty" class="btn btn-outline-dark">
          파티 수정
        </button>
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
.red {
  color: red;
}
</style>