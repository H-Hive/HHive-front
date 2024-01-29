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
        <!-- 모달 내용을 여기에 추가하세요 -->
        <h2>파티 생성</h2>
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
        <button @click="createParty" class="btn btn-outline-dark">
          파티 생성
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import partyService from "@/services/party.service";

export default {
  data() {
    return {
      partyData: {},
      modalMessage: "",
      errorMessage: "",
      redirectPath: "",
    };
  },

  props: ["hiveId"],

  methods: {
    createParty() {
      partyService
        .createParty(this.partyData, this.hiveId)
        .then((response) => {
          const partyId = response.data.payload.id;
          this.modalMessage = "파티가 생성되었습니다.";
          this.redirectPath = "/party/" + this.hiveId + "/" + partyId;
          this.$emit("create-Success", this.modalMessage, this.redirectPath);
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = error.response.data.message;
        });
    },
    closeModal() {
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