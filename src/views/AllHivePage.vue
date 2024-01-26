<template>
  <div class="body">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="검색어 입력" aria-label="Recipient's username"
        aria-describedby="button-addon2">
      <button class="btn-search" type="button" id="button-addon2">조회</button>
    </div>
    <div>
      <button type="button" class="btn btn-outline-dark">전체</button>
      <button type="button" class="btn btn-outline-dark">운동</button>
      <button type="button" class="btn btn-outline-dark">아웃도어/여행</button>
      <button type="button" class="btn btn-outline-dark">음악/악기</button>
      <button type="button" class="btn btn-outline-dark">봉사활동</button>
      <button type="button" class="btn btn-outline-dark">댄스/무용</button>
      <button type="button" class="btn btn-outline-dark">사교/인맥</button>
      <button type="button" class="btn btn-outline-dark">사진/영상</button>
      <button type="button" class="btn btn-outline-dark">반려동물</button>
      <button type="button" @click="openCreateHiveModal" class="btn btn-outline-dark hive-btn">모임 만들기</button>
      <CreateHiveForm-Modal v-if="showCreateHiveModal" @modal-Closed="closeCreateHiveModal" @create-Success = "handleModalClosed"/>
      <Alert-Modal v-if="showAlertModal" :is-visible="showAlertModal" :message="modalMessage" @closeModalAndRedirect="closeModalAndRedirect"/>
    </div>
    <div class="content-wrapper"> <!-- 새로운 wrapper 추가 -->
      <div class="hives">
        <template v-for="(hiveData, index) in hiveDatas" :key="index">
          <div class="hive-card">
            <HiveCardForm :hiveData="hiveData" />
          </div>
        </template>
      </div>
      <div class="kakao-map">
        <KakaoMap />
      </div>
    </div>
  </div>
</template>

<script>
import hiveService from "../services/hive.service";
import HiveCardForm from "@/components/HiveCardForm.vue";
import authService from "@/services/auth.service";
import KakaoMap from "@/components/KakaoMap.vue";

import CreateHiveFormModal from "@/components/CreateHiveFormModal.vue"
import AlertModal from "@/components/AlertModal.vue";
export default {

  data() {
    return {
      hiveDatas: "",
      showCreateHiveModal: false,
      showAlertModal: false,
      modalMessage: "",
      redirectPath: "",
    };
  },

  methods: {
    closeAlertModal() {
      this.showAlertModal = false;
    },
    openCreateHiveModal() {
      this.showCreateHiveModal = true;
    },
    closeCreateHiveModal() {
      this.showCreateHiveModal = false;
    },
    handleModalClosed(message,redirectPath) {
      this.modalMessage = message;
      this.redirectPath = redirectPath;
      this.showAlertModal=true;
    },
    closeModalAndRedirect() {
      // 모달 닫기
      this.showAlertModal = false;
      this.$router.push({ path: this.redirectPath });
    },
  },

  components: {
    KakaoMap,
    HiveCardForm,
    "CreateHiveForm-Modal": CreateHiveFormModal,
    "Alert-Modal": AlertModal,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      hiveService
        .getAllHives()
        .then((response) => {
          this.hiveDatas = response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>

.btn {
  margin-top: 15px;
  margin-right: 15px;
}
.btn-search{
  padding: 10px;
  background-color: #ffc944;
  border-radius: 5px; /* 테두리 모서리 둥글게 설정 */
}

.body {
  padding: 100px;
  width: 100%;
}

.content-wrapper {
  display: flex; /* Flexbox를 적용 */
  align-items: start; /* 자식 요소들을 위쪽으로 정렬 */
  height: 1000px; /* 높이를 적절하게 설정 */
  width: 100%;
  margin-top: 40px;
}

.hives {
  flex-grow: 1; /* 사용 가능한 공간을 채움 */
  padding-left: 70px; /* 오른쪽 패딩으로 간격을 조정 */
  margin-top: 10px;
  max-height: 1000px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
}

.kakao-map{
  width: 80%; /* 너비 고정 */
  height: 100%; /* 높이를 적절하게 설정 */
  margin-top: 30px;
  padding-left: 70px; /* 오른쪽 패딩으로 간격을 조정 */
}

/* 미디어 쿼리로 화면 크기에 따른 반응형 레이아웃 조정 */
@media (max-width: 1500px) {
  .content-wrapper {
    flex-direction: column; /* 화면이 작을 때 세로로 배치 */
  }

  .kakao-map {
    width: 100%; /* 화면이 작을 때 너비를 100%로 설정 */
    order: 1; /* kakao-map을 hive-cards 아래로 배치 */
  }

  .hives {
    order: 2; /* hives를 kakao-map 위로 배치 */
  }
}


</style>