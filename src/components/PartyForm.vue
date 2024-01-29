// 파티에 대한 상세 정보를 보여주는 페이지
// 파티에 대한 상세 정보(파티 조회) + 파티 가입/탈퇴 버튼(가입 여부에 따라 다름 눌렀을 시 정말 하시겠습니까 모달 창 뜸)

<template>
  <div>
    <div v-if="partyData">
      <h1>파티 이름: {{ partyData.title }}</h1>
      <h1>파티 주최자: {{ partyData.username }}</h1>
      <h1>파티 내용: {{ partyData.content }}</h1>
      <h1>파티 일시: {{ partyData.dateTime }}</h1>
      <h1>여기 멤버 수만 넣을까?</h1>
    </div>
    <button v-if="isPartyHost" type="click" @click="openUpdatePartyModal">
      수정하기
    </button>
    <button v-if="isPartyHost" type="click" @click="openDeletePartyModal">
      삭제하기
    </button>
    <button v-if="isPartyHost"  @click="openSendNotToHIveModal" class="btn btn-outline-dark">알림 전송</button>
    <UpdatePartyModal
      :id="partyData.id"
      v-if="showUpdatePartyModal"
      @modal-Closed="closeUpdatePartyModal"
      @update-Success="handleUpdatePartyModalClosed"
    />
    <SendNotificationForm-modal v-if="showSendNotModal" :is-visible="showSendNotModal" :id="partyData.id" :type="groupType" @closeModal="closeSendNotModal" @send-Success="handleNotModalClosed"/>
    <AlertModal
      v-if="showAlertModal"
      :is-visible="showAlertModal"
      :message="modalMessage"
      @closeModalAndRedirect="closeModalAndRedirect"
    />
    <DeletePartyModal
      v-if="showDeletePartyModal"
      :is-visible="showDeletePartyModal"
      :id="partyData.id"
      @delete-Success="handleDeletePartyModalClosed"
      @closeModal="closeDeletePartyModal"
    />
  </div>
</template>

<script>
import partyService from "../services/party.service";
import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import DeletePartyModal from "./DeletePartyModal.vue";
import UpdatePartyModal from "./UpdatePartyModal.vue";
import AlertModal from "./AlertModal.vue";
import SendNotificationForm from "./SendNotificationForm.vue";

export default {
  data() {
    return {
      partyData: {},
      modalMessage: "",
      showUpdatePartyModal: false,
      showAlertModal: false,
      showDeletePartyModal: false,
      showSendNotModal: false,
      groupType:"",
    };
  },

  props: ["hiveId", "partyId"],

  components: {
    AlertModal,
    UpdatePartyModal,
    DeletePartyModal,
    "SendNotificationForm-modal": SendNotificationForm,
  },

  computed: {
    isPartyHost() {
      return userService.getUserInfo()["username"] == this.partyData.username;
    },
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      partyService
        .getParty(this.hiveId, this.partyId)
        .then((response) => {
          this.partyData = response.data["payload"];
          console.log("partyDatas = ", this.partyData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  methods: {
    //UpdatePartyModal
    openUpdatePartyModal() {
      this.showUpdatePartyModal = true;
    },

    closeUpdatePartyModal() {
      this.showUpdatePartyModal = false;
    },

    handleUpdatePartyModalClosed(modalMessage) {
      this.modalMessage = modalMessage;
      this.closeUpdatePartyModal();
      this.showAlertModal = true;
    },

    //DeletePartyModal
    openDeletePartyModal() {
      this.showDeletePartyModal = true;
    },

    closeDeletePartyModal() {
      this.showDeletePartyModal = false;
    },

    handleDeletePartyModalClosed(modalMessage) {
      this.modalMessage = modalMessage;
      this.closeDeletePartyModal();
      this.$router.push(`/hive/${this.hiveId}`);
    },

    //AlertModal
    closeModalAndRedirect() {
      if (this.modalMessage == "업데이트 성공") {
        this.showAlertModal = false;
        window.location.reload();
      }else{
        this.showAlertModal = false;
      }
    },
    closeSendNotModal(){
      this.showSendNotModal = false;
    },
    openSendNotToHIveModal(){
      this.groupType="party";
      this.showSendNotModal = true;
    },
    handleNotModalClosed(modalMessage){
      this.modalMessage = modalMessage;
      this.closeSendNotModal();
      this.showAlertModal = true;
    }
  },
};
</script>

<style scoped>
</style>
