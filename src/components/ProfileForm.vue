<template>
  <div class="container">
    <header class="jumbotron">
      <h2>프로필</h2>
    </header>
    <div>
      <img
        type="button"
        class="myimg"
        alt="HTML"
        src="../images/userlogo.png"
      />
    </div>
    <div class="userinfo" v-if="!isEditMode">
      <h3>
        <strong>{{ profileData.username }}</strong>
      </h3>
      <h5>
        <strong>Email : </strong>
        {{ profileData.email }}

        <!-- 이메일 인증 section -->
        <button v-if="isKakaoUser" type="button">카카오 유저</button>
        <button v-else-if="isEmailVerified" type="button">
          이메일 인증 완료
        </button>
        <button
          v-else-if="isLoggedInUser"
          class="btn btn-outline-warning"
          style="color: black; margin-left: 5px"
          @click="requestVerificationCode"
        >
          이메일 인증
        </button>
        <EmailVerificationModal
          v-if="isEmailVerificationModalVisible"
          @verification-Success="handleEmailVerificationSuccess"
          @modal-Closed="closeEmailVerificationModal"
          :email="profileData.email"
        />
      </h5>
      <h5>
        <strong>자기소개 : </strong>
        {{ profileData.description }}
      </h5>
      <h5>
        <strong>주요 관심사 : </strong>
        <span v-if="!profileData.majorCategory">없음</span>
        <span v-else>{{ profileData.majorCategory }}</span>
      </h5>
      <h5>
        <strong>세부 관심사 : </strong>
        <span v-if="!profileData.subCategory">없음</span>
        <span v-else>{{ profileData.subCategory }}</span>
      </h5>
    </div>

    <div v-else>
      <label>Email:</label>
      <input v-model="profileData.email" />
      <p></p>

      <label>Description:</label>
      <textarea v-model="profileData.description"></textarea>
    </div>

    <!-- 로그인한 유저에게만 보이는 프로필 수정, 비밀번호 변경, 탈퇴 버튼 -->
    <div v-if="isLoggedInUser" class="profile-btn">
      <EditButton
        :isEditMode="isEditMode"
        @submitOrToggle="submitOrToggle"
        class="btn btn-warning"
      />
      <button
        class="btn btn-warning"
        style="margin-left: 10px"
        @click="showUpdateUserCategoryModal"
        v-if="!isEditMode"
      >
        관심사 수정
      </button>
      <button
        v-if="isEditMode"
        @click="cancelEdit"
        style="margin-left: 10px"
        class="btn btn-warning"
      >
        수정 취소
      </button>
      <div v-if="isEditMode" class="profileBtn">
        <button
          @click="showUpdatePasswordModal"
          class="btn btn-warning"
          style="margin-top: 20px"
        >
          비밀번호 변경
        </button>
        <UpdatePasswordModal
          :is-visible="isUpdatePasswordModalVisible"
          @justCloseModal="justCloseUpdatePasswordModal"
        />
        <ResignButton :property="'User'" />
      </div>
    </div>
    <UpdateUserCategoryModal
      v-if="isUpdateUserCategoryModalVisible"
      @modal-Closed="closeModal"
    />
    <div>
      <div v-if="!isEditMode">
        <h6 class="hive-section-title">내가 참여한 모임들</h6>
        <!-- HiveCard 렌더링을 위한 컨테이너 -->
        <div class="hive-card-container">
          <div
            v-for="(hiveData, index) in hiveDatas"
            :key="index"
            class="hive-card"
          >
            <HiveCardForm :hiveData="hiveData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import authService from "@/services/auth.service";
import EditButton from "./EditButton.vue";
import HiveCardForm from "@/components/HiveCardForm.vue";
import UpdatePasswordModal from "./UpdatePasswordModal.vue";
import ResignButton from "./ResignButton.vue";
import UpdateUserCategoryModal from "./UpdateUserCategoryModal.vue";
import EmailVerificationModal from "./EmailVerificationModal.vue";

export default {
  name: "profile-form",

  data() {
    return {
      profileData: {},
      originProfileData: {},
      isEditMode: false,
      isUpdatePasswordModalVisible: false,
      isUpdateUserCategoryModalVisible: false,
      isEmailVerificationModalVisible: false,
    };
  },

  components: {
    EditButton,
    HiveCardForm,
    UpdatePasswordModal,
    ResignButton,
    UpdateUserCategoryModal,
    EmailVerificationModal,
  },

  props: {
    userId: Number,
    hiveDatas: Array,
  },

  computed: {
    isLoggedInUser() {
      return userService.getUserId() === this.userId;
    },
    isEmailVerified() {
      console.log(this.profileData);
      return this.profileData.emailVerified;
    },
    isKakaoUser() {
      return userService.isKakaoUser();
    },
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      console.log("id at profile: ", this.userId);
      userService
        .getProfile(this.userId)
        .then((response) => {
          this.profileData = response.data["payload"];
          this.originProfileData = JSON.parse(JSON.stringify(this.profileData));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  methods: {
    submitOrToggle() {
      if (this.isEditMode) {
        userService
          .modifyProfile(this.userId, this.profileData)
          .then((response) => {
            console.log(response);
            alert("수정이 완료되었습니다");
            window.location.reload();
          })
          .catch((error) => {
            alert(error.response.data);
          });
      }
      this.isEditMode = !this.isEditMode;
    },

    cancelEdit() {
      this.isEditMode = !this.isEditMode;
      this.profileData = JSON.parse(JSON.stringify(this.originProfileData));
    },

    showUpdatePasswordModal() {
      this.isUpdatePasswordModalVisible = true;
    },

    justCloseUpdatePasswordModal() {
      this.isUpdatePasswordModalVisible = false;
    },

    //이메일 인증 관련
    requestVerificationCode() {
      authService.requestVerificationCode(this.profileData.email);
      this.isEmailVerificationModalVisible = true;
    },

    handleEmailVerificationSuccess(modalMessage) {
      this.closeEmailVerificationModal;
      alert(modalMessage);
    },

    closeEmailVerificationModal() {
      this.isEmailVerificationModalVisible = false;
    },

    //카테고리 수정 모달
    showUpdateUserCategoryModal() {
      this.isUpdateUserCategoryModalVisible = true;
    },

    closeModal() {
      this.isUpdateUserCategoryModalVisible = false;
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.myimg {
  width: 140px;
  height: 140px;
  float: left;
}

.userinfo {
  width: 500px;
  margin: 5px 0px 0px 150px;
  margin-bottom: 20px;
}

.container {
  display: flex; /* Flexbox 레이아웃 사용 */
  flex-direction: column; /* 항목들을 세로로 나열 */
  align-items: center; /* 가로 방향에서 중앙 정렬 */
  width: 100%; /* 컨테이너의 너비 (필요에 따라 조정 가능) */
  max-width: 800px; /* 최대 너비 설정 */
  margin-top: 100px;
  margin-bottom: 50px;
  padding: 50px; /* 컨테이너 내부의 여백 */
  border: 1px solid #aaaaaa; /* 테두리 추가 */
  border-radius: 10px; /* 컨테이너 모서리를 10px 둥글게 처리 */
}
.jumbotron {
  width: 100%; /* jumbotron의 너비 */
  text-align: center; /* 텍스트를 가운데 정렬 */
  margin-bottom: 40px; /* 하단 마진 추가 */
}

.profileBtn {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.profileBtn button {
  margin-bottom: 5px; /* 모든 버튼의 아래쪽에 10px의 마진 추가 */
}
.cancel-edit-btn {
  margin-top: 5px; /* 버튼 상단에 10px의 간격 추가 */
}

p {
  text-align: left; /* 단락 내의 텍스트를 가운데 정렬  */
  width: 100%; /* 단락의 너비 */
}

input,
textarea {
  border: 2px solid #cccccc; /* 테두리 색상 및 두께 설정 */
  border-radius: 5px; /* 테두리 모서리 둥글게 설정 */
  padding: 10px; /* 입력 필드 내부의 여백 설정 */
  width: 100%; /* 입력 필드 너비 설정 */
  margin-bottom: 20px; /* 입력 필드 아래쪽 여백 설정 */
}

.hive-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* 카드들 사이에 공간을 균등하게 분배 */
  gap: 20px; /* 카드 사이의 간격을 조정 */
  padding: 0 30px; /* 컨테이너 양쪽에 15px의 패딩을 추가 */
  max-height: 800px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
}

.hive-section-title {
  width: 100%;
  text-align: center; /* 왼쪽 정렬 */
  font-size: 1.4em; /* 글씨 크기를 1.5em으로 설정 */
  margin-bottom: 20px; /* 하단 여백 설정 */
  margin-top: 40px;
}
</style>