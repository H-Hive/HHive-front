// 내 하이브들만 보여주는 페이지

<template>
  <div class="myHive">
    <template v-for="(hiveData, index) in hiveDatas" :key="index">
      <div class="hive-form">
        <HiveForm :hiveData="hiveData" />
      </div>
    </template>
  </div>
</template>

<script>
import HiveForm from "../components/HiveForm.vue";
import userService from "@/services/user.service";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      hiveDatas: "",
    };
  },

  components: {
    HiveForm,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      const userId = userService.getUserInfo()["userId"];
      userService
        .getMyHives(userId)
        .then((response) => {
          this.hiveDatas = response.data["payload"];
          console.log(this.hiveDatas);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>
<style scoped>
.myHive{
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 800px;
  max-height: 800px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
}

.hive-form{
  margin: auto;
}
</style>
