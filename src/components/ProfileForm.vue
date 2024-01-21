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
      <p>서울특별시 / 1993.1.29</p>
      <h5>
        <strong>Email : </strong>
        {{ profileData.email }}
      </h5>
      <h5>
        <strong>자기소개 : </strong>
        {{ profileData.description }}
      </h5>
    </div>

    <div v-else>
      <label>Email:</label>
      <input v-model="profileData.email" />
      <p></p>

      <label>Description:</label>
      <textarea v-model="profileData.description"></textarea>
    </div>
    <EditButton :isEditMode="isEditMode" @submitOrToggle="submitOrToggle" />
    <button v-if="isEditMode" @click="cancelEdit">수정 취소</button>
    <br />
  </div>

  <div>
    <div>
      <h6>내가 참여한 모임들</h6>
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import authService from "@/services/auth.service";
import EditButton from "./EditButton.vue";

export default {
  name: "profile-form",

  data() {
    return {
      profileData: {},
      originProfileData: {},
      isEditMode: false,
    };
  },

  components: {
    EditButton,
  },

  props: {
    userId: Number,
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
        userService.modifyProfile(this.userId, this.profileData);
        alert("수정이 완료되었습니다");
        window.location.reload();
      }
      this.isEditMode = !this.isEditMode;
    },

    cancelEdit() {
      this.isEditMode = !this.isEditMode;
      this.profileData = JSON.parse(JSON.stringify(this.originProfileData));
    },
  },
};
</script>

<style>
.myimg {
  width: 140px;
  height: 140px;
  float: left;
}

.userinfo {
  width: 500px;
  margin: 5px 0px 0px 150px;
}

.container {
  display: flex; /* Flexbox 레이아웃 사용 */
  flex-direction: column; /* 항목들을 세로로 나열 */
  align-items: center; /* 가로 방향에서 중앙 정렬 */
  justify-content: center; /* 세로 방향에서 중앙 정렬 */
  width: 100%; /* 컨테이너의 너비 (필요에 따라 조정 가능) */
  max-width: 600px; /* 최대 너비 설정 */
  margin: auto; /* 자동 마진으로 페이지 중앙에 위치 */
  margin-top: 50px; /* 컨테이너 위쪽에 50px의 여백 추가 */
  padding: 50px; /* 컨테이너 내부의 여백 */
  border: 1px solid black; /* 테두리 추가 */
  border-radius: 10px; /* 컨테이너 모서리를 10px 둥글게 처리 */
}
.jumbotron {
  width: 100%; /* jumbotron의 너비 */
  text-align: center; /* 텍스트를 가운데 정렬 */
  margin-bottom: 40px; /* 하단 마진 추가 */
}
p {
  text-align: left; /* 단락 내의 텍스트를 가운데 정렬  */
  width: 100%; /* 단락의 너비 */
}
</style>