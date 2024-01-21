<template>
  <ProfileForm :userId="userId" />
  <div v-if="isMine">
    <li v-for="(hiveData, index) in hiveDatas" :key="index">
      <div class="hive-card">
        <HiveCardForm :hiveData="hiveData" />
      </div>
    </li>
  </div>
</template>

<script>
import ProfileForm from "@/components/ProfileForm.vue";
import userService from "@/services/user.service";
import HiveCardForm from "@/components/HiveCardForm.vue";

export default {
  // props: ["userId"],

  data() {
    return {
      hiveDatas: {},
    };
  },

  components: {
    ProfileForm,
    HiveCardForm,
  },

  computed: {
    userId() {
      if (this.$route.params.userId) {
        return this.$route.params.userId;
      } else {
        return userService.getUserId();
      }
    },
    isMine() {
      return userService.getUserId();
    },
  },

  mounted() {
    console.log("userId at ProfilePage: ", this.userId);
    if (this.isMine) {
      userService.getMyHives(this.userId).then((response) => {
        this.hiveDatas = response.data["payload"];
        console.log("내 하이브들: ", this.hiveDatas);
      });
    }
  },

  methods: {
    getMyHives() {
      if (this.isMine) {
        userService.getMyHives(this.userId).then((response) => {
          this.hiveDatas = response.data["payload"];
          console.log("내 하이브들: ", this.hiveDatas);
        });
      }
    },
  },
};
</script>

<style scoped>
.hive-card {
  display: inline-block;
}
</style>