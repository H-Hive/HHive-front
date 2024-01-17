<template>
  <div>
    <template v-for="(hiveData, index) in hiveDatas" :key="index">
      <HiveForm 
        :hiveData="hiveData"
      />
    </template>
  </div>
</template>

<script>
import HiveForm from "../components/Hive.vue"
import commonService from "../services/common.service"
import userService from '@/services/user.service'

export default {
  data() {
    return {
      hiveDatas: '',
    };
  },

  components: {
    HiveForm
  },

  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }
    else {
      const userId = userService.getUserInfo()['userId'];
      userService.getMyHives(userId).then(
        response => {
          this.hiveDatas = commonService.extractJSONFromProxy(response.data['payload']);
          console.log(this.hiveDatas);
        })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>
