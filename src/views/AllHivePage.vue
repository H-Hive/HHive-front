<template>
  <div class="body">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="검색어 입력"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        v-model="searchHive"
      />
      <button
        class="btn-search"
        type="button"
        id="button-addon2"
        @click="searchHives"
      >
        조회
      </button>
    </div>
    <div class="btn-container">
      <button type="button" class="btn btn-outline-dark" style="height: 100%" @click="showAllHives">
        전체
      </button>
      <div v-for="(majorCategory, mIndex) in categories" :key="mIndex">
        <button
          type="button"
          class="btn btn-outline-dark"
          @click="
            toggleSubCategories(mIndex);
            showHives(majorCategory.name);
          "
        >
          {{ majorCategory.title }}
        </button>

        <div v-if="majorCategory.showSubCategories" class="sub-container">
          <div
            v-for="(subCategory, sIndex) in majorCategory.subCategories"
            :key="sIndex"
          >
            <button
              type="button"
              style="margin: 5px"
              @click="
                showHivesBySubCategory(majorCategory.name, subCategory.name)
              "
            >
              {{ subCategory.title }}
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        @click="openCreateHiveModal"
        class="btn btn-warning"
      >
        일반 모임 만들기
      </button>
      <CreateHiveForm-Modal
        class="create-modal"
        v-if="showCreateHiveModal"
        :roadAddress="roadAddress"
        @modal-Closed="closeCreateHiveModal"
        @create-Success="handleModalClosed"
      />
      <Alert-Modal
        class="close-modal"
        v-if="showAlertModal"
        :is-visible="showAlertModal"
        :message="modalMessage"
        @closeModalAndRedirect="closeModalAndRedirect"
      />
    </div>
    <div class="content-wrapper">
      <div class="hives">
        <template v-for="(hiveData, index) in hiveDatas" :key="index">
          <div class="hive-card">
            <HiveCardForm :hiveData="hiveData" />
          </div>
        </template>
      </div>
      <div class="kakao-map">
        <h2 style="font-weight: bold; text-align: center;">모임을 만드실 위치를 클릭해 주세요</h2>
        <KakaoMap @getAddress-Success="openCreateHiveByAddressModal"/>
      </div>
    </div>
  </div>
</template>

<script>
import hiveService from "../services/hive.service";
import HiveCardForm from "@/components/HiveCardForm.vue";
import authService from "@/services/auth.service";
import KakaoMap from "@/components/KakaoMap.vue";
import CreateHiveFormModal from "@/components/CreateHiveFormModal.vue";
import AlertModal from "@/components/AlertModal.vue";

export default {
  data() {
    return {
      hiveDatas: "",
      showCreateHiveModal: false,
      showAlertModal: false,
      modalMessage: "",
      redirectPath: "",
      searchHive: "",
      roadAddress:"",
      categories: [
        {
          title: "게임",
          name: "GAME",
          showSubCategories: false,
          subCategories: [
            { title: "리그 오브 레전드", name: "LOL" },
            { title: "오버워치", name: "OVERWATCH" },
            { title: "스타크래프트", name: "STARCRAFT" },
          ],
        },
        {
          title: "스포츠",
          name: "SPORTS",
          showSubCategories: false,
          subCategories: [
            { title: "축구", name: "SOCCER" },
            { title: "야구", name: "BASEBALL" },
          ],
        },
        {
          title: "아웃도어/여행",
          name: "TRAVEL",
          showSubCategories: false,
          subCategories: [
            { title: "캠핑", name: "CAMPING" },
            { title: "글램핑", name: "GLAMPING" },
          ],
        },
        {
          title: "음악/악기",
          name: "MUSIC",
          showSubCategories: false,
          subCategories: [
            { title: "밴드", name: "BAND" },
            { title: "피아노", name: "PIANO" },
          ],
        },
        {
          title: "댄스/무용",
          name: "DANCE",
          showSubCategories: false,
          subCategories: [
            { title: "케이팝 댄스", name: "KPOP" },
            { title: "벨리댄스", name: "BELLY" },
          ],
        },
        {
          title: "사교/인맥",
          name: "SOCIAL",
          showSubCategories: false,
          subCategories: [
            { title: "주식", name: "STOCK" },
            { title: "가상화폐", name: "BITCOIN" },
          ],
        },
        {
          title: "사진/영상",
          name: "MEDIA",
          showSubCategories: false,
          subCategories: [
            { title: "사진 동호회", name: "PHOTO" },
            { title: "영화 동호회", name: "MOVIE" },
          ],
        },
        {
          title: "반려동물",
          name: "PET",
          showSubCategories: false,
          subCategories: [
            { title: "강아지 모임", name: "DOG" },
            { title: "고양이 모임", name: "CAT" },
          ],
        },
        {
          title: "기타",
          name: "ETC",
        },
      ],
    };
  },

  methods: {
    closeAlertModal() {
      this.showAlertModal = false;
    },
    openCreateHiveModal() {
      this.roadAddress = "주소 미정"
      this.showCreateHiveModal = true;
      },
    openCreateHiveByAddressModal(address){
      this.roadAddress = address;
      this.showCreateHiveModal = true;
    },
    closeCreateHiveModal() {
      this.showCreateHiveModal = false;
    },
    handleModalClosed(message, redirectPath) {
      this.modalMessage = message;
      this.redirectPath = redirectPath;
      this.showAlertModal = true;
    },
    closeModalAndRedirect() {
      // 모달 닫기
      this.showAlertModal = false;
      this.$router.push({ path: this.redirectPath });
    },
    showHives(category) {
      hiveService
        .getHiveByCategories(category)
        .then((response) => {
          this.hiveDatas = response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showHivesBySubCategory(majorCategory, subCategory) {
      hiveService
        .getHiveByCategories(majorCategory, subCategory)
        .then((response) => {
          this.hiveDatas = response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showAllHives() {
      hiveService
        .getAllHives()
        .then((response) => {
          this.hiveDatas = response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchHives() {
      if (this.searchHive) {
        this.hiveDatas = this.hiveDatas.filter((hiveData) =>
          hiveData.title.toLowerCase().includes(this.searchHive.toLowerCase())
        );
      } else {
        this.showAllHives();
      }
    },

    toggleSubCategories(mIndex) {
      // 해당 outerItem의 showInnerItems 속성을 토글
      this.categories[mIndex].showSubCategories =
        !this.categories[mIndex].showSubCategories;
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
.body {
  padding: 110px;
  width: 100%;
}

.btn {
  margin-top: 15px;
  margin-right: 15px;
}

.btn-search {
  padding: 10px;
  background-color: #ffc944;
  border-radius: 5px; /* 테두리 모서리 둥글게 설정 */
}

.btn-container {
  margin-left: 0.5%;
  display: flex;
  flex-wrap: wrap;
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
  padding: 0px 30px; /* 왼쪽 패딩으로 간격을 조정 */
  margin-top: 10px;
  max-height: 1000px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
}

.kakao-map {
  width: 80%; /* 너비 고정 */
  height: 100%; /* 높이를 적절하게 설정 */
  margin-top: 30px;
  padding-left: 70px;
}

.major-category {
  margin-right: 100px; /* 메이저 카테고리 간격 조절 */
}

.sub-categories {
  display: flex;
  flex-direction: column; /* 서브 카테고리들을 세로로 나열 */
  margin-top: 5px; /* 서브 카테고리 간격 조절 */
}

.sub-container {
  background-color: #eeeeee;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin-top: 2px;
}

</style>