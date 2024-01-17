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
import hiveService from "../services/hive.service"
import commonService from "../services/common.service"

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
      hiveService.getAllHives().then(
        response => {
          this.hiveDatas = commonService.extractJSONFromProxy(response.data['payload']);
          console.log(this.hiveDatas[0].hostName);
        })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>


<AlertModal
      :is-visible="isModalVisible"
      :message="modalMessage"
      @closeAndRedirect="closeModalAndRedirect"
  />