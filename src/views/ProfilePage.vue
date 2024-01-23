<template>
<!--  <ProfileForm :userId="userId" />-->
<!--  <div v-if="isMine">-->
<!--    <li v-for="(hiveData, index) in hiveDatas" :key="index">-->
<!--      <div class="hive-card">-->
<!--        <HiveCardForm :hiveData="hiveData" />-->
<!--      </div>-->
<!--    </li>-->
<!--  </div>-->
  <ProfileForm :userId="userId" :hiveDatas="hiveDatas" />
</template>

<script>
import ProfileForm from "@/components/ProfileForm.vue";
import userService from "@/services/user.service";

export default {
  // props: ["userId"],

  data() {
    return {
      hiveDatas: {},
    };
  },

  components: {
    ProfileForm,
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
        //     console.log("내 하이브들: ", this.hiveDatas);
        // 이제 hiveDatas를 ProfileForm 컴포넌트에 prop으로 전달합니다.

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
</style>