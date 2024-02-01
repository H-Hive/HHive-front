// 내 하이브들만 보여주는 페이지
<template>
  <div class="myHive">
    <div class="hive-group">
      <h2>내 주관 모임</h2>
      <template v-if="myHostHiveData.length > 0">
        <template v-for="(hiveData, index) in myHostHiveData" :key="index">
          <div class="hive-form">
            <HiveForm :hiveData="hiveData" />
          </div>
        </template>
      </template>
      <template v-else>
        <p>아직 모임이 없습니다.</p>
      </template>
    </div>
    <div class="divider-line"></div>
    <div class="hive-group">
      <h2>내 소속 모임</h2>
      <template v-if="myhiveData.length > 0">
        <template v-for="(hiveData, index) in myhiveData" :key="index">
          <div class="hive-form">
            <HiveForm :hiveData="hiveData" />
          </div>
        </template>
      </template>
      <template v-else>
        <p>아직 모임이 없습니다.</p>
      </template>
    </div>
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
      myHostHiveData: [],
      myhiveData:[],
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
          this.myHostHiveData = this.hiveDatas.filter(hive => hive.hostId == userId);
          this.myhiveData = this.hiveDatas.filter(hive => hive.hostId !== userId);
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
  flex-direction: row;
  margin: auto;
  width: 1500px;
  max-height: 800px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
}

.hive-group {
  flex: 1; 
  margin-right: 20px;
}

.hive-form {
  margin: 10px 0;
}

.divider-line {
  border-left: 1px solid #ccc;
  height: 100%; 
  margin: 0 200px; 
  
}
</style>
