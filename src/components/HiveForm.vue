<template class="body">
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ hiveData.title }}</strong>
      </h3>
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

  mounted() {},
};
</script>

<style scoped>
  .container {
    width: 500px;
    height: 100%;
    border: 2px solid brown;
    border-radius: 15px;
    margin: 10px 10px 10px 10px;

    
    
  }
</style>