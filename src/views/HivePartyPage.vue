<template>
  <div class="body">
    <div
      class="party-container"
      v-for="(partyData, index) in partyDatas"
      :key="index"
    >
      <PartyCardForm :partyData="partyData" :hiveId="this.hiveId" />
    </div>
  </div>
</template>

<script>
import PartyCardForm from "@/components/PartyCardForm.vue";
import partyService from "@/services/party.service";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      partyDatas: [],
    };
  },

  props: ["hiveId"],

  components: {
    PartyCardForm,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      partyService
        .getAllPartiesByHiveId(this.hiveId)
        .then((response) => {
          this.partyDatas = response.data["payload"];
          console.log("partyDatas = ", this.partyDatas);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },

  method: {},
};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  margin-top: 65px;
  color: rgb(0, 0, 0);
  padding: 10px;
  background-color: rgb(255, 243, 161);
  justify-content: center;
}
</style>