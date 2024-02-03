<template>
  <div class="createhive-modal">
    <div class="modal-content">
      <span class="close" @click="closeModal"
        style="position: absolute; top: 0%; right: 2.5%; cursor: pointer;">&times;</span>
      <div>
        <!-- 모달 내용을 여기에 추가하세요 -->
        <h2>모임 생성</h2>
        <div class="line"></div>
        <div class="content-top">
          <label for="hiveTitle">모임 이름:</label>
          <input type="text" id="hiveTitle" v-model="hiveTitle" />
          <CategoryForm @categories-selected="handleCategories" />
        </div>
        <div class="adress" v-if="roadAddress == '주소 미정'">
          <DaumAddress @address-selected="handleAddress" />
        </div>
        <div class="content-bottom">
          <p :class="{ 'hidden': !errorMessage, 'red': errorMessage }">{{ errorMessage }}</p>
          <button @click="createHive" class="btn btn-outline-dark">모임 생성</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hiveService from '@/services/hive.service';
import CategoryForm from './CategoryForm.vue'
import DaumAddress from './DaumAddress.vue';

export default {
  components: {
    CategoryForm,
    DaumAddress
  },
  data() {
    return {
      hiveTitle: "",
      modalMessage: "",
      errorMessage: "",
      redirectPath: "",
      majorCategory: "",
      subCategory: "",
      mainRoadAddress: "", // 도로명 주소를 저장할 변수

    };
  },
  props: {
    roadAddress: {
      type: String,
    },
  },
  methods: {
    createHive() {
      hiveService.createHive(this.hiveTitle, this.majorCategory, this.subCategory, this.mainRoadAddress)
        .then((response) => {
          const hiveId = response.data.payload.id;
          this.modalMessage = response.data.message;
          this.redirectPath = "hive/" + hiveId;
          this.$emit('create-Success', this.modalMessage, this.redirectPath);
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = error.response.data.message;
        });
    },
    handleCategories(selectedMajorCategory, selectedSubCategory) {
      this.majorCategory = selectedMajorCategory;
      this.subCategory = selectedSubCategory;
    },
    handleAddress(zonecode, DaumRoadAddress) {
      // 선택된 도로명 주소 저장
      this.mainRoadAddress = DaumRoadAddress;
    },
    closeModal() {
      this.$emit('modal-Closed');
    },
  },
  mounted () {
    this.mainRoadAddress = this.roadAddress;
  },
};
</script>

<style scoped>
.createhive-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 500px;
  /* 모달의 너비 조절 */
  height: 400px;
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

.content-top {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}

.content-top input {
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 50%;
  height: 30px;
}

.content-bottom {
  width: 100%;
}

.hidden {
  margin-top: 40px;
}

.red {
  color: red;
}
</style>