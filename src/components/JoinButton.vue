// 가입하기 버튼
// 하이브의 가입인지 파티의 가입인지 props로 확인받고, 그 id에 해당하는 하이브/파티 에 가입한다.

<template>
  <button @click="handleJoinClick">가입하기</button>

  <YesOrNoModal
    :is-visible="isModalVisible"
    :message="modalMessage"
    @closeModalAndReload="closeModalAndReload"
    @justCloseModal="justCloseModal"
  />
</template>

<script>
import hiveService from "@/services/hive.service";
import YesOrNoModal from "./YesOrNoModal.vue";
import partyService from "@/services/party.service";

export default {
  data() {
    return {
      isModalVisible: false,
      modalMessage: "",
    };
  },

  components: {
    YesOrNoModal,
  },

  props: {
    property: String,
    id: Number,
  },

  methods: {
    handleJoinClick() {
      if (this.property == "Hive") {
        this.showModal("이 하이브에 가입하시겠습니까?");
      } else if (this.property == "Party") {
        this.showModal("이 파티에 가입하시겠습니까?");
      } else {
        console.log("이상한 값이 들어왔어용");
      }
    },

    showModal(message) {
      // 모달을 표시하고 메시지 설정
      this.isModalVisible = true;
      this.modalMessage = message;
    },

    closeModalAndReload() {
      if (this.property == "Hive") {
        hiveService.joinHive(this.id);
      } else if (this.property == "Party") {
        partyService.joinParty(this.id);
      }
      this.isModalVisible = false;
      //오류 처리 해줘야함
      alert("가입이 완료되었습니다.");
      window.location.reload();
    },

    justCloseModal() {
      // 모달 닫기
      this.isModalVisible = false;
    },
  },
};
</script>
