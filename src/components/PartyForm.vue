// 파티에 대한 상세 정보를 보여주는 페이지
// 파티에 대한 상세 정보(파티 조회) + 파티 가입/탈퇴 버튼(가입 여부에 따라 다름 눌렀을 시 정말 하시겠습니까 모달 창 뜸)

<template>
    <div v-if="partyData" class="party-card">

      <div class="party-actions">
        <button class="btn btn-outline-dark" v-if="isPartyHost" type="click" @click="openUpdatePartyModal">
          수정하기
        </button>
        <button class="btn btn-outline-dark" v-if="isPartyHost" type="click" @click="openDeletePartyModal">
          삭제하기
        </button>
        <button
            v-if="isPartyHost"
            @click="openSendNotToHIveModal"
            class="btn btn-outline-dark"
        >
          알림 전송
        </button>
        <UpdatePartyModal
            :id="partyData.id"
            v-if="showUpdatePartyModal"
            @modal-Closed="closeUpdatePartyModal"
            @update-Success="handleUpdatePartyModalClosed"
        />
        <SendNotificationForm-modal
            v-if="showSendNotModal"
            :is-visible="showSendNotModal"
            :id="partyData.id"
            :type="groupType"
            @closeModal="closeSendNotModal"
            @send-Success="handleNotModalClosed"
        />
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

      <div class="party-info">
        <div class="party-title">
          <h2>{{ partyData.title }}</h2>
        </div>
        <div class="host">
          <p class="party-host" >방장</p>
          <div class="party-host-data">
            {{ partyData.username }}
          </div>
        </div>
        <div class="datetime">
          <p class="party-datetime">약속 날짜</p>
          <div class="party-datetime-data">
            {{ partyData.dateTime }}
          </div>
        </div>
        <div class="content">
          <p class="party-content">파티 내용</p>
          <div class="content-data">
            {{ partyData.content }}
          </div>
        </div>
        <div class="members">
          <p class="party-members">가입 멤버</p>
          <div class="party-members-data">
            {{ partyMember.join(', ') }}
          </div>
        </div>
        <div class="join-btn" v-if="isHiveUser">
          <div>
            <JoinButton
                :property="'Party'"
                :id="partyData.id"
                v-if="!isPartyUser"
            />
            <ResignButton :property="'Party'" :id="partyData.id" v-else />
          </div>
        </div>
      </div>

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
import JoinButton from "./JoinButton.vue";
import ResignButton from "./ResignButton.vue";
import hiveService from "@/services/hive.service";

export default {
  data() {
    return {
      partyData: {},
      modalMessage: "",
      showUpdatePartyModal: false,
      showAlertModal: false,
      showDeletePartyModal: false,
      showSendNotModal: false,
      groupType: "",
      partyMember: [],
    };
  },

  props: ["hiveId", "partyId"],

  components: {
    AlertModal,
    UpdatePartyModal,
    DeletePartyModal,
    JoinButton,
    ResignButton,
    "SendNotificationForm-modal": SendNotificationForm,
  },

  computed: {
    isHiveUser() {
      return hiveService.isHiveUser(this.hiveId);
    },
    isPartyHost() {
      return userService.getUserInfo()["username"] == this.partyData.username;
    },
    isPartyUser() {
      const partyMembers = this.partyData.members;
      const currentUser = userService.getUserInfo()["username"];

      for (const key in partyMembers) {
        if (partyMembers[key]["username"] === currentUser) return true;
      }
      return false;
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

          const partyMembers = this.partyData.members;
          for (const key in partyMembers) {
            this.partyMember.push(partyMembers[key]["username"]);
          }
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
      } else {
        this.showAlertModal = false;
      }
    },
    closeSendNotModal() {
      this.showSendNotModal = false;
    },
    openSendNotToHIveModal() {
      this.groupType = "party";
      this.showSendNotModal = true;
    },
    handleNotModalClosed(modalMessage) {
      this.modalMessage = modalMessage;
      this.closeSendNotModal();
      this.showAlertModal = true;
    },
  },
};
</script>

<style scoped>

.party-card {
  width:60%;
  margin-top: 30px;
  padding: 30px;
  border: 1px solid #aaaaaa;
  border-radius: 8px;
  margin-bottom: 150px;
}

.party-actions {
  display: flex;
  justify-content: flex-end;
}

.party-actions button {
  margin-right: 10px;
}

.party-title {
  border-bottom: 1px solid #aaaaaa;
  padding: 10px;
}

.host {
  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬 */
  border-bottom: 1px solid #aaaaaa;
}
.party-host {
  width: 10%;
  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬 */
  padding-top: 10px;
  padding-left: 25px;
}

.datetime {
  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬 */
  border-bottom: 1px solid #aaaaaa;
}
.party-datetime {
  padding-top: 10px;
  padding-left: 25px;
  width: 10%;
}

.party-datetime-data {
}

.content {
  display: flex;
  height: 400px;
  border-bottom: 1px solid #aaaaaa;
}

.party-content {
  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬 */
  justify-content: center; /* 가로 방향에서 중앙 정렬 */
  width: 30%;
  border-right: 1px solid #aaaaaa;
  margin-bottom: -1px;
  max-height: 400px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
}

.content-data {
  padding: 20px;
}

.members {
  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬 */
  border-bottom: 1px solid #aaaaaa;
  height: 100px;
}

.party-members {
  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬 */
  padding-top: 10px;
  padding-left: 25px;
  width: 10%;
}

.party-members-data {
  width: 90%;
  max-height: 100px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
}

.join-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}

</style>

