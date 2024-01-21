<template>
    <div class="container">
      <header class="jumbotron">
        <h3>
          <strong>{{ notificationData.groupName }}</strong>
          <div class="line"></div>
          {{ notificationData.message }}
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
.line {
  border-bottom: 1px solid #000; /* 원하는 선 스타일 지정 */
  margin-bottom: 10px; /* 선과 메시지 사이의 간격 조절 (선택사항) */
}
</style>