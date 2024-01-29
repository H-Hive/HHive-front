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
        <h2>관심사 수정</h2>
        <div class="line"></div>
        <!-- 백엔드 API 수정예상되므로 미작동 -->
        <CategoryForm @categories-selected="handleCategories" />

        <p :class="{ hidden: !errorMessage, red: errorMessage }">
          {{ errorMessage }}
        </p>
        <button @click="updateUserCategory" class="btn btn-outline-dark">
          관심사 수정완료
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import CategoryForm from "./CategoryForm.vue";
import userService from "@/services/user.service";

export default {
  data() {
    return {
      isVisible: false,
      majorCategory: "",
      subCategory: "",
      modalMessage: "",
      errorMessage: "",
    };
  },

  components: {
    CategoryForm,
  },

  methods: {
    updateUserCategory() {
      userService
        .updateUserCategory(
          userService.getUserId(),
          this.majorCategory,
          this.subCategory
        )
        .then((response) => {
          this.modalMessage = response.data.message;
          this.$emit("update-Success", this.modalMessage);
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = error.response.data.message;
        });
      this.closeModal();
    },

    handleCategories(selectedMajorCategory, selectedSubCategory) {
      this.majorCategory = selectedMajorCategory;
      this.subCategory = selectedSubCategory;
    },

    closeModal() {
      // 모달이 닫힐 때 이벤트 발생
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