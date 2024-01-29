<template>
  <div class="hivecardform">
    <div class="card-grid">
      <div class="card" style="width: 18rem">
        <img src="" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title" @click="goToHivePage(hiveData.id)">
            <button type="button" class="btn btn-warning">
              {{ hiveData.title }}
            </button>
          </h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ hiveData.introduction }}</li>
          <li class="list-group-item">{{hiveData.majorCategory}} - {{ hiveData.subCategory }}</li>
          <li class="list-group-item">Host: {{ hiveData.hostName }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hive-card-form",
  props: {
    hiveData: {},
  },

  methods: {
    goToHivePage(hiveId) {
      this.$router.push(`/hive/${hiveId}`);
    },
  },

  mounted() {},
};
</script>

<style scoped>
.btn {
  width: 95%;
  color: black;
  margin: 4px 5px;
}

.list-group-item {
  color: black;
  background-color: ivory;
  border-radius: 5px;
  margin: 5px 6px;
  max-height: 41px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
}

.card {
  margin-top: 20px;
  margin-bottom: 40px;
  color: rgb(0, 0, 0);
  border: 1px solid orange;
  background-color: rgb(255, 243, 161);
  background-position: center;
  background-size: cover;
}

.card-img-top {
  width: 80%;
  height: 180px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background-size: cover;
  background-position: center;
  background: white;
  margin: 15px auto 0;
  position: relative;
}
</style>