
<template>
  <div class="myHive">
    <div class="hive-group">
      <h2>내 주관 파티</h2>
      <template v-for="(partyData, index) in myHostPartyDatas" :key="index">
      <MyPartyCardForm :partyData="partyData" />
    </template>
    </div>
    <div class="divider-line"></div>
    <div class="hive-group">
      <h2>내 소속 파티</h2>
      <template v-for="(partyData, index) in myPartyDatas" :key="index">
      <MyPartyCardForm :partyData="partyData" />
    </template>
    </div>
  </div>
</template>

<script>
import MyPartyCardForm from "../components/MyPartyCardForm.vue";
import userService from "@/services/user.service";
import authService from "@/services/auth.service";
import partyService from "@/services/party.service";

export default {
  data() {
    return {
      partyDatas: [],
      myHostPartyDatas:[],
      myPartyDatas:[],
    };
  },

  components: {
    MyPartyCardForm,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      const userId = userService.getUserInfo()["userId"];
      partyService
        .getMyParties(userId)
        .then((response) => {
          this.partyDatas = response.data["payload"];
          this.myHostPartyDatas = this.partyDatas.filter(party => party.hostId == userId);
          this.myPartyDatas = this.partyDatas.filter(party => party.hostId !== userId);
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