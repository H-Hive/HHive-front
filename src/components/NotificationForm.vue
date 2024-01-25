<template>
    <div class="container">
      <header class="jumbotron">
        <h3>
          <strong class="group-name">{{ notificationData.groupName }}</strong>
          <div class="line"></div>
          <div class="message-content">{{ notificationData.message }}</div>
        </h3>
      </header>
    </div>
  </template>
  
  <script>
  export default {
    name: "notification-form",
  
    props: {
      notificationData: {
        type: Object,
      },
    },
  
    mounted() {},
  };
  </script>
  
  <style scoped>

  .group-name {
    font-weight: bold; /* 폰트 두껍게 */
    font-size: 30px; /* 폰트 크기 */
    color: black; /* 폰트 색상 */
  }

  .message-content {
    font-size: 20px; /* 폰트 크기 */
    color: black; /* 폰트 색상 */
  }

  .line {
    border-bottom: 1px solid grey; /* 선의 색상을 원하는 색상으로 변경 */
    margin-bottom: 10px;
  }

  .jumbotron{
    margin-top: 30px;
    border: 1px solid grey; /* 테두리 추가 */
    padding: 15px;
    border-radius: 10px;
  }
</style>