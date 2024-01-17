<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{hiveData.title}}</strong>
      </h3>
    </header>
    <p>
      <strong>introduction:</strong>
      {{hiveData.introduction}}
    </p>
    <p>
      <strong>host:</strong>
      {{hiveData.hostName}}
    </p>
  </div>
</template>

<script>

export default {
  name: 'HiveForm',
  // data() {
  //   return {
  //     // id: '',
  //     // title: '',
  //     // introduction: '',
  //     // hostId: '',
  //     // hostName: '',
  //     // hivePlayers: '',
  //     hiveData: {}
  //   };
  // },
  props: {
    hiveData: {
      type: Object
    }
  },

  mounted() {
  }
};
</script>

<style scoped>
/* 모달 스타일링 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>