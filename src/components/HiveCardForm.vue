<template>
  <div class="card" style="width: 18rem">
    <img src="" class="card-img-top" alt="..." /> 여기 사진 들어갈 듯
    <div class="card-body">
      <h5 class="card-title" @click="goToHivePage(hiveData.id)">
        {{ hiveData.title }} 여기 누르면 이동
      </h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ hiveData.introduction }}</li>
      <li class="list-group-item">하이브 카테고리 들어갈 듯</li>
      <li class="list-group-item">Host: {{ hiveData.hostName }}</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "hive-card-form",
  props: {
    hiveData: {
      type: Object,
    },
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
</style>