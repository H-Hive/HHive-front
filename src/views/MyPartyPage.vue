// 내 하이브들만 보여주는 페이지

<template>
  <div>
    <template v-for="(partyData, index) in partyDatas" :key="index">
      <PartyCardForm :partyData="partyData" />
    </template>
  </div>
</template>

<script>
import PartyCardForm from "../components/PartyCardForm.vue";
import userService from "@/services/user.service";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      partyDatas: "",
    };
  },

  components: {
    PartyCardForm,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      const userId = userService.getUserInfo()["userId"];
      userService
        .getMyParties(userId)
        .then((response) => {
          this.partyDatas = response.data["payload"];
          console.log(this.partyDatas);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>
