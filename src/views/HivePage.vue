// 하이브에 대한 상세 정보를 보여주는 페이지
// 하이브에 대한 상세 정보(하이브 조회) + 개설된 파티 목록(파티 전체 조회 + 눌렀을 시 파티 조회) + 채팅방(미구현) + 하이브 탈퇴 버튼(눌렀을 시 정말 하시겠습니까 뜨고 하이브 탈퇴)
// 만약 하이브에 가입된 상태가 아니라면 -> 하이브에 대한 상세 정보만 + 하이브 가입 버튼이 생기기

<template >
  <div class="body">
    <UpdateHive-Modal
      :id="hiveData.id"
      :is-info="isInfo"
      v-if="showUpdateHiveModal"
      @modal-Closed="closeUpdateHiveModal"
      @update-Success="handleModalClosed"
    />
    <Alert-Modal
      v-if="showAlertModal"
      :is-visible="showAlertModal"
      :message="modalMessage"
      @closeModalAndRedirect="closeModalAndRedirect"
    />
    <deleteModal
      v-if="showDeleteModal"
      :is-visible="showDeleteModal"
      :id="this.id"
      @delete-Success="closeDeleteModalAndRedirect"
      @closeModal="closeDeleteModal"
    />
    <CreatePartyFormModal
      :hiveId="hiveData.id"
      v-if="showCreatePartyModal"
      @modal-Closed="closeCreatePartyModal"
      @create-Success="handleCreatePartyModalClosed"
    />
    <SendNotificationForm-modal v-if="showSendNotModal" :is-visible="showSendNotModal" :id="this.id" :type="groupType" @closeModal="closeSendNotModal" @send-Success="handleNotModalClosed"/>

    <div class="main-content">
      <div class="left-section">
        <div v-if="hiveData" class="hive-top">
          <div class="title-container">
            <h1 class="title">
              {{ hiveData.title }}
            </h1>
            <div class="title-buttons">
              <button
                type="button"
                v-if="hiveData.hostId == userId"
                @click="openUpdateHiveTitleModal"
                class="btn btn-outline-dark"
              >
                제목 수정
              </button>
              <button
                type="button"
                v-if="hiveData.hostId == userId"
                @click="openUpdateHiveInfoModal"
                class="btn btn-outline-dark"
              >
                소개 수정
              </button>
              <button
                type="button"
                v-if="hiveData.hostId == userId"
                @click="openDeleteModal"
                class="btn btn-outline-dark"
              >
                모임 삭제
              </button>
              <button
                type="button"
                v-if="isHiveUser"
                @click="openCreatePartyModal"
                class="btn btn-outline-dark"
              >
                파티 생성
              </button>
              <button type="button" v-if="(hiveData.hostId==userId)" @click="openSendNotToHIveModal" class="btn btn-outline-dark">알림 전송</button>
            </div>
          </div>
          <p class="hostName">방장 : {{ hiveData.hostName }}</p>
          <h5 class="Data">{{ hiveData.introduction }}</h5>

          <div class="people-container">
            <h6 class="people">구성원</h6>
            <div class="line"></div>
            <div class="people-contents">
              <template v-for="(user, index) in userList" :key="index">
                <div>
                  <UserInfoForm :userInfo="user" />
                </div>
                <div class="space"></div>
              </template>
            </div>
          </div>
        </div>
        <div class="join-btn">
          <div>
            <JoinButton
              :property="'Hive'"
              :id="hiveData.id"
              v-if="!isHiveUser"

            />
            <ResignButton :property="'Hive'" :id="hiveData.id" v-else/>
          </div>
        </div>
      </div>

      <div class="all-meeting">
        <div class="r-meeting">
          <div class="regular-meeting">
            <div class="party-container" v-if="partyDatas.length">
              <h2 class="title text-center">최신 모임</h2>
            <div class="regularmeetingdetail">
              <h4>{{partyDatas[0].partyList[0].title}}</h4>
              <h4>일시 : {{ partyDatas[0].partyList[0].dateTime}}</h4>
              <h4>내용 : {{ partyDatas[0].partyList[0].content }}</h4>
              <h4>참석 예정 인원:{{ partyDatas[0].partyList[0].members.length }}/{{ userList.length }}</h4>
            </div>
            <div class="meet-btn">
              <JoinButton
              :property="'Party'"
              :id="partyDatas[0].partyList[0].id"
              class="btn btn-warning"
                style="
                  --bs-btn-padding-y: 0.5rem;
                  --bs-btn-padding-x: 1rem;
                  --bs-btn-font-size: 1rem;
                  margin: 10px 10px 10px 30px;
                  width: auto;
                "
              v-if="!partyDatas[0].partyList[0].members.find(member => member.username == userName )"
            />
            <ResignButton :property="'Party'" :id="partyDatas[0].partyList[0].id" class="btn btn-warning"
                style="
                  --bs-btn-padding-y: 0.5rem;
                  --bs-btn-padding-x: 1rem;
                  --bs-btn-font-size: 1rem;
                  margin: 10px 10px 10px 10px;
                  width: auto;
                " v-else />
             
            </div>
          </div>
          <div v-if="!partyDatas.length">
            <h2 class="title text-center">아직 모임이 없어요~</h2>
          </div>
          </div>
        </div>
        <div class="board-container">
          <h2 class="title text-center">모임 목록</h2>
          <div class="board">
            <div class="party-container" v-for="(partyData, index) in partyDatas.slice(0, 3)" :key="index">
              <PartyCardForm :partyData="partyData" :hiveId="this.id" />
            </div>
            <div class="board-btn">
              <button
                type="button"
                class="btn btn-warning"
                style="
                  --bs-btn-padding-y: 0.5rem;
                  --bs-btn-padding-x: 1rem;
                  --bs-btn-font-size: 1rem;
                  margin: 10px 10px 10px 10px;
                  width: auto;
                "
              >
                더 보러가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    &lt;!&ndash; 추후 하이브 파티 전체조회 나오면 메소드랑 같이 수정할 것 &ndash;&gt;
    <div class="party-container" v-for="(partyData, index) in partyDatas" :key="index">
      <PartyCardForm :partyData="partyData" :hiveId="this.id" />
    </div>-->
    <!-- <div>
      <PartyCardForm :partyData="this.partyDatas" />
    </div> -->
  </div>
</template>

<script>
import PartyCardForm from "../components/PartyCardForm.vue";
import hiveService from "../services/hive.service";
import authService from "@/services/auth.service";
import partyService from "@/services/party.service";
import JoinButton from "@/components/JoinButton.vue";
import ResignButton from "@/components/ResignButton.vue";
import UpateHiveModal from "@/components/UpdateHiveFormModal.vue";
import AlertModal from "@/components/AlertModal.vue";
import deleteModal from "@/components/DeleteHiveModal.vue";
import UserInfoForm from "@/components/UserInfoForm.vue";
import userService from "@/services/user.service";
import SendNotificationForm from "@/components/SendNotificationForm.vue";
import CreatePartyFormModal from "@/components/CreatePartyFormModal.vue";

export default {
  data() {
    return {
      hiveData: {},
      partyDatas: [],
      userList: [],
      isHiveUser: false,
      modalMessage: "",
      showUpdateHiveModal: false,
      showAlertModal:false,
      showDeleteModal:false,
      showCreatePartyModal: false,
      viewHostMenu:false,
      userId:"",
      userName:"",
      isInfo:"",
      groupType:"",
      showSendNotModal: false,
      partyMember: [],
    };
  },

  props: ["id"],

  components: {
    PartyCardForm,
    JoinButton,
    ResignButton,
    deleteModal,
    "UpdateHive-Modal": UpateHiveModal,
    "SendNotificationForm-modal": SendNotificationForm,
    "Alert-Modal": AlertModal,
    UserInfoForm,
    CreatePartyFormModal,
  },

  created() {
    hiveService.isHiveUser(this.id).then((result) => {
      if (result) {
        this.isHiveUser = true;
      } else {
        this.isHiveUser = false;
      }
    });
  },
  methods: {
    getUserInfo() {
      hiveService
        .getHiveUsers(this.id)
        .then((Response) => {
          this.userList = Response.data.payload;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openDeleteModal() {
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    closeAlertModal() {
      this.showAlertModal = false;
    },
    openUpdateHiveTitleModal() {
      this.isInfo = "title";
      this.showUpdateHiveModal = true;
    },
    openUpdateHiveInfoModal() {
      this.isInfo = "info";
      this.showUpdateHiveModal = true;
    },
    checkDeleteModal() {
      this.modalMessage = "정말 모임을 삭제 하시겠습니까?";
      this.showAlertModal = true;
    },
    closeUpdateHiveModal() {
      this.showUpdateHiveModal = false;
    },
    handleModalClosed(modalMessage) {
      this.modalMessage = modalMessage;
      this.closeUpdateHiveModal();
      this.showAlertModal = true;
    },
    closeModalAndRedirect() {
      // 모달 닫기
      this.showAlertModal = false;
      console.log(this.redirectPath);
      if (this.modalMessage == "삭제가 완료 되었습니다") {
        this.$router.push("/hives");
      } else if (this.modalMessage == "파티가 생성되었습니다.") {
        this.$router.push(this.redirectPath);
      } else {
        this.$router.go(0);
      }
    },
    closeDeleteModalAndRedirect() {
      this.showDeleteModal = false;
      this.modalMessage = "삭제가 완료 되었습니다";
      this.showAlertModal = true;
    },

    //CreatePartyModal Part

    openCreatePartyModal() {
      this.showCreatePartyModal = true;
    },

    closeCreatePartyModal() {
      this.showCreatePartyModal = false;
    },

    handleCreatePartyModalClosed(modalMessage, redirectPath) {
      this.modalMessage = modalMessage;
      this.redirectPath = redirectPath;
      this.closeCreatePartyModal();
      this.showAlertModal = true;
    },
    closeSendNotModal(){
      this.showSendNotModal = false;
    },
    openSendNotToHIveModal(){
      this.groupType="hive";
      this.showSendNotModal = true;
    },
    handleNotModalClosed(modalMessage){
      this.modalMessage = modalMessage;
      this.closeSendNotModal();
      this.showAlertModal = true;
    }
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      hiveService
        .getHive(this.id)
        .then((response) => {
          this.hiveData = response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
      partyService
        .getAllPartiesByHiveId(this.id)
        .then((response) => {
          this.partyDatas = response.data["payload"];
          console.log("partyDatas = ", this.partyDatas);
        })
        .catch((error) => {
          console.log(error);
        });
      this.userId = userService.getUserId();
      this.userName = userService.getUserInfo()['username'];
    }
    this.getUserInfo();
  },
};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  margin-top: 65px;
  color: rgb(0, 0, 0);
  padding: 10px;
  background-color: rgb(255, 243, 161);
  justify-content: center;
}

.category-btn {
  display: flex;
  width: 100%;
  margin-top: 15px;
  margin-left: 8%;
  flex-direction: row;
}

.category-btn button {
  margin: 10px 10px 10px 10px;
}

.main-content {
  display: flex; /* 가로로 배치 */
  width: 100%;
}

.left-section {
  margin-left: 8%;
  margin-top: 4.5%;
  width: 50%;
  display: flex;
  flex-direction: column; /* 세로로 쌓기 */
}

.hive-top {
  display: flex;
  background-color: ivory;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px;
  border: 1.5px solid grey;
  border-radius: 8px;
}

.title-container {
  text-align: center;
}

.title {
  margin-bottom: 10px; /* 제목과 버튼 사이의 간격을 줄입니다. */
}

.title-buttons button {
  margin: 10px 10px 10px 10px;
}

.hostName {
  margin-top: 10px;
}

.Data {
  margin-top: 4%;
  width: 100%;
  padding: 20px 40px;
  height: 160px;
  max-height: 160px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
  border: 1px solid #313131;
  border-radius: 8px;
  color: #434343;
}

.people-container {
  margin-top: 30px;
  margin-bottom: 15px;
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #313131;
  border-radius: 5px;
  background-color: #fffcd9;
}
.people {
  width: 100%;
  margin: 10px 0px;
  text-align: center;
  font-weight: bold;
}

.line {
  border-bottom: 1px solid #313131;
  width: 100%;
}

.people-contents {
  padding: 15px 100px;
  max-height: 100px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
  color: #434343;
}

.all-meeting {
  margin: 2.5% 8%;
  display: flex;
  flex-direction: column;
  width: 50%;
}

.regular-meeting {
  padding: 30px;
  border: 1.5px solid grey;
  border-radius: 8px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  background-color: ivory;
}

.regularmeetingdetail {
  margin-top: 15px;
  border: 1px solid #313131;
  border-radius: 8px;
  padding: 15px;
  color: #313131;
}

.meet-btn {
  display: flex;
  justify-content: flex-end;
}

.board-container {
  padding: 30px;
  margin-top: 2%;
  width: 100%;
  border: 1.5px solid grey;
  border-radius: 8px;
  background-color: ivory;
}

.card {
  margin: 5px 5px 5px 5px;
  --bs-btn-padding-y: 0.5rem;
  --bs-btn-padding-x: 1rem;
  --bs-btn-font-size: 1rem;
}

.card-body {
  margin-left: 10px;
}

.board-btn {
  display: flex;
  justify-content: flex-end;
}

.join-btn {
  margin: 20px auto;
}

</style>
