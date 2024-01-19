<template>
  <div>
    <div v-if="hiveData">
      <h1>{{ hiveData.title }}</h1>
      <h1>{{ hiveData.title }}</h1>
      <h1>{{ hiveData.hostName }}</h1>
      <h1>{{ hiveData.id }}</h1>
      <h1>{{ this.hiveData.title }}</h1>
      <h1>{{ this.hiveData.title }}</h1>
      <h1>왜 안나와?</h1>
    </div>
  </div>
</template>

<script>
import commonService from "@/services/common.service";
import hiveService from "../services/hive.service";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      hiveData: {},
    };
  },

  props: ["id"],

  components: {},

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      hiveService
        .getHive(this.id)
        .then((response) => {
          this.hiveData = response.data["payload"];
          console.log(
            "HivePage.Vue 에서의 하이브데이터: ",
            this.hiveData.title
          );
          this.hiveData = commonService.extractJSONFromProxy(
            response.data["payload"]
          );
          console.log(
            "HivePage.Vue 에서의 하이브데이터: ",
            this.hiveData.title
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>
</style>
