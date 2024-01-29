<template class="body">
  <div class="container">
    <header class="jumbotron">
      <h5 class="card-title" @click="goToHivePage(hiveData.id)">
            <button type="button" >
              {{ hiveData.title }}
            </button>
          </h5>
    </header>
    <p>
      <strong>introduction:</strong>
      {{ hiveData.introduction }}
    </p>
    <p>
      <strong>host:</strong>
      {{ hiveData.hostName }}
    </p>
  </div>
</template>

<script>
export default {
  name: "hive-form",

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
  .container {
    width: 500px;
    border: 2px solid orange;
    border-radius: 15px;
    margin: 20px 10px 10px 10px;
    background-color: ivory;
    max-height: 150px; /* 최대 높이 설정 */
    overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
  }
  .jumbotron{
    padding: 10px;
  }

</style>