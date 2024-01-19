<template>
  <div>
    <template v-for="(hiveData, index) in hiveDatas" :key="index">
      <HiveCardForm :hiveData="hiveData" />
    </template>
  </div>
</template>

<script>
import hiveService from "../services/hive.service";
import HiveCardForm from "@/components/HiveCardForm.vue";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      hiveDatas: "",
    };
  },

  components: {
    HiveCardForm,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      hiveService
        .getAllHives()
        .then((response) => {
          this.hiveDatas = response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>