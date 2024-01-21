<template>
  <div class="hivecardform">
    <div class="card-grid">
      <div class="card" style="width: 18rem">
        <img src="" class="card-img-top" alt="..." /> 여기 사진 들어갈 듯
        <div class="card-body">
          <h5 class="card-title" @click="goToHivePage(hiveData.id)">
            <button type="button" class="btn btn-outline-danger">
              {{ hiveData.title }}
            </button>
          </h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ hiveData.introduction }}</li>
          <li class="list-group-item">하이브 카테고리 들어갈 듯</li>
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
  border: 2px solid brown;
  border-radius: 5px;
  margin: 4px 5px;
}

.list-group-item {
  color: black;

  background-color: rgb(199, 154, 32, 0.5);
  border: 2px solid brown;
  border-radius: 5px;
  margin: 4px 5px;
}

.card-body {
  background-color: transparent;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;

  grid-template-columns: repeat(4, 1fr); /* 4열 그리드로 설정 */
  gap: 20px; /* 카드 사이의 간격 설정 */
}

.card {
  margin: 15px auto 0px auto;

  color: rgb(0, 0, 0);

  background-color: rgb(20, 59, 59);

  background-image: url("../images/HiveBackground.png");
  background-position: center;
  background-size: cover;
}

.card-img-top {
  width: 80%;
  height: 180px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background-size: cover;
  background-position: center;
  background: rgb(37, 118, 124);
  margin: 15px auto 0;
  position: relative;
}
</style>