<template>
    <div>
      <p><strong></strong> {{ userInfo.username }}</p>
    </div>
  </template>
  <script>
  export default {
    props: {
      userInfo: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  