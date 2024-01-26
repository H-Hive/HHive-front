// 하이브에 대한 상세 정보를 보여주는 페이지
// 하이브에 대한 상세 정보(하이브 조회) + 개설된 파티 목록(파티 전체 조회 + 눌렀을 시 파티 조회) + 채팅방(미구현) + 하이브 탈퇴 버튼(눌렀을 시 정말 하시겠습니까 뜨고 하이브 탈퇴)
// 만약 하이브에 가입된 상태가 아니라면 -> 하이브에 대한 상세 정보만 + 하이브 가입 버튼이 생기기

<template >
  <div class="body">
    <div class="category-btn">
      <button type="button" class="btn btn-outline-dark">홈</button>
      <button type="button" class="btn btn-outline-dark">게시판</button>
      <button type="button" class="btn btn-outline-dark">사진첩</button>
      <button type="button" class="btn btn-outline-dark">채팅</button>
    </div>
    <UpdateHive-Modal :id="hiveData.id" v-if="showUpdateHiveModal" @modal-Closed="closeUpdateHiveModal" @update-Success= "handleModalClosed"/>
      <Alert-Modal v-if="showAlertModal" :is-visible="showAlertModal" :message="modalMessage" @closeModalAndRedirect="closeModalAndRedirect"/>
      <deleteModal v-if="showDeleteModal" :is-visible="showDeleteModal" :id="this.id" @delete-Success="closeDeleteModalAndRedirect" @closeModal="closeDeleteModal"/>
    <div v-if="hiveData" class="hive-top">
      <div class="title-container">
        <h1 class="title">
          {{ hiveData.title }}
        </h1>
        <div class="title-buttons">
          <button type="button" v-if="(hiveData.hostId==userId)" @click="openUpdateHiveModal" class="btn btn-outline-dark">수정</button>
          <button type="button" v-if="(hiveData.hostId==userId)" @click="openDeleteModal" class="btn btn-outline-dark">모임 삭제</button>
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
    <div class="container">
      <div class="row row-cols-2">
        <div class="col">
          <h2 class="title text-center">정기모임</h2>
          <div class="regularmeeting">
            <div class="regularmeetingdetail"> 
              <h4>일시 : 2024.03.05</h4>
              <h4>내용 : 스파르타 수료파티</h4>
              <h4>위치 : 서울시 강남구 한신포차</h4>
              <h4>참석 : 4/20</h4>
            </div>
            <div class="d-grid gap-2 d-md-block">
              <button
                type="button"
                class="btn btn-primary"
                style="
                  --bs-btn-padding-y: 0.5rem;
                  --bs-btn-padding-x: 1rem;
                  --bs-btn-font-size: 1rem;
                  margin: 10px 10px 10px 30px;
                  width: auto;
                "
              >
                참여하기 !!
              </button>
              <button
                type="button"
                class="btn btn-primary"
                style="
                  --bs-btn-padding-y: 0.5rem;
                  --bs-btn-padding-x: 1rem;
                  --bs-btn-font-size: 1rem;
                  margin: 10px 10px 10px 10px;
                  width: auto;
                "
              >
                다음 기회에...
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <h2 class="title text-center">게시판</h2>

          <div class="board">
            <div class="card">
              <div type="button" class="card-body">
                [공지] 우리동네 모임에 오신걸 환영합니다!
              </div>
            </div>
            <div class="card">
              <div type="button" class="card-body">
                [공지] 모임 시 주의사항!!!
              </div>
            </div>
            <div class="card">
              <div type="button" class="card-body">
                [공지] 이번주 행운의 주인공!!!
              </div>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary"
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
          <div>
            <JoinButton
              :property="'Hive'"
              :id="hiveData.id"
              v-if="!isHiveUser"
            />
            <ResignButton :property="'Hive'" :id="hiveData.id" v-else />
          </div>
        </div>
      </div>
    </div>
    <div class="joinbtnform">
      <div>
        <button
          type="button"
          class="btn btn-info"
          style="
            --bs-btn-padding-y: 0.5rem;
            --bs-btn-padding-x: 1rem;
            --bs-btn-font-size: 1rem;
            margin: 10px 10px 10px 10px;
            width: 300px auto;
          "
          v-if="!isHiveUser"
        >
          <JoinButton :property="'Hive'" :id="hiveData.id" />
        </button>
      </div>
    </div>

    <!-- 추후 하이브 파티 전체조회 나오면 메소드랑 같이 수정할 것 -->
    <div v-for="(partyData, index) in partyDatas" :key="index">
      <PartyCardForm :partyData="partyData" :hiveId="this.id" />
    </div>
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
import UpateHiveModal from "@/components/UpdateHiveFormModal.vue"
import AlertModal from "@/components/AlertModal.vue";
import deleteModal from "@/components/DeleteHiveModal.vue"
import UserInfoForm from "@/components/UserInfoForm.vue";
import userService from "@/services/user.service";

export default {
  data() {
    return {
      hiveData: {},
      partyDatas: {},
      userList: [],
      isHiveUser: false,
      modalMessage:"",
      showUpdateHiveModal: false,
      showAlertModal:false,
      showDeleteModal:false,
      viewHostMenu:false,
      userId:"",
    };
  },

  props: ["id"],

  components: {
    PartyCardForm,
    JoinButton,
    ResignButton,
    deleteModal,
    "UpdateHive-Modal": UpateHiveModal,
    "Alert-Modal": AlertModal,
    UserInfoForm,
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
    getUserInfo(){
      hiveService.getHiveUsers(this.id)
      .then((Response)=>{
      this.userList = Response.data.payload;            
    })         
    .catch((error)=>{        
      console.log(error);     
    })
    },
    openDeleteModal(){
      this.showDeleteModal = true;
    },
    closeDeleteModal(){
      this.showDeleteModal = false;
    },
    closeAlertModal() {
      this.showAlertModal = false;  
    },
    openUpdateHiveModal() {
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
      if(this.modalMessage =="삭제가 완료 되었습니다")
      {
        this.$router.push("/hives");
      }else{
      this.$router.go(0);
      }
    },
    closeDeleteModalAndRedirect(){
      this.showDeleteModal = false;
      this.modalMessage = "삭제가 완료 되었습니다"
      this.showAlertModal = true;
    },
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
        this.userId=userService.getUserId();
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
  margin-left: 130px;
  flex-direction: row;
}

.category-btn button{
  margin: 10px 10px 10px 10px;
}

.hive-top{
  display: flex;
  margin: 50px auto;
  background-color: ivory;
  flex-direction: column;
  align-items: center;
  width: 800px;
  padding: 30px;
  border: 2px solid grey;
  border-radius: 8px;
;
}

.title-container {
  text-align: center;
}

.title {
  margin-bottom: 10px; /* 제목과 버튼 사이의 간격을 줄입니다. */
}

.title-buttons button{
  margin: 10px 10px 10px 10px;
}

.hostName{
  margin-top: 10px;
}

.Data{
  padding: 20px 55px;
  max-height: 160px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
  border: 1px solid #313131;
  border-radius: 5px;
  color: #434343;
}

.people-container{
  margin-top: 30px;
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #313131;
  border-radius: 5px;
  background-color: #fffcd9;
}
.people{
  width: 100%;
  margin: 10px 0px;
  text-align: center;
  font-weight: bold;
}

.line {
  border-bottom: 1px solid #313131;
  width: 100%;
}

.people-contents{
  padding: 15px 100px;
  max-height: 100px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
  color: #434343;
}

.regularmeeting {
  width: 90%;
  height: auto;
  border-radius: 5px;
  background-color: rgb(212, 206, 231);
}

.regularmeetingdetail {
  margin: 10px 10px 10px 20px;
}

.regularmeetingdetail {
  padding: 30px 15px 0px 15px;
}

.board {
  width: 90%;
  height: auto;

  border-radius: 5px;
  margin: 10px 10px 10px 10px;
  background-color: rgb(212, 206, 231);
}

.card {
  margin: 5px 5px 5px 5px;
  --bs-btn-padding-y: 0.5rem;
  --bs-btn-padding-x: 1rem;
  --bs-btn-font-size: 1rem;
}

.card-body {
  margin: auto;
  padding: auto;
}

.joinbtnform {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>
