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
    <div class="hives">
      <template v-for="(hiveData, index) in hiveDatas" :key="index">
        <div class="hive-card">
          <HiveCardForm :hiveData="hiveData" />
          
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import hiveService from "../services/hive.service";
import HiveCardForm from "@/components/HiveCardForm.vue";
import authService from "@/services/auth.service";
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

.hives {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 카드들을 왼쪽 정렬 */
  align-items: flex-start; /* 카드들을 위쪽 정렬 */
}

.hive-card {
  padding: 40px;
  flex: 1 0 21%; /* 화면 크기에 따라 카드가 줄어들 수 있도록 설정 */
  max-width: calc(25% - 20px); /* gap 고려한 최대 너비 설정 */
}

/* 화면이 중간 크기일 때, 한 줄에 3개의 카드를 표시 (예: 가로 크기가 768px 미만일 때) */
@media (max-width: 1450px) {
  .hive-card {
    flex: 1 0 calc(33.333% - 20px);
    max-width: calc(33.333% - 20px);
  }
}

/* 화면이 더 작을 때, 한 줄에 2개의 카드를 표시 (예: 가로 크기가 600px 미만일 때) */
@media (max-width: 1150px) {
  .hive-card {
    flex: 1 0 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
}

/* 모바일 화면 크기일 때, 한 줄에 1개의 카드만 표시 (예: 가로 크기가 480px 미만일 때) */
@media (max-width: 850px) {
  .hive-card {
    flex: 1 0 100%;
    max-width: 100%;
  }
}

</style>