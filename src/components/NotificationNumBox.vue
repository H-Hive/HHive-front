<template>
    <div class="number-box">
      {{ value }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .number-box {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #b4002d; 
    color: #ffffff; 
    text-align: center;
    line-height: 150%;
    font-size: 14px;
    border-radius: 4px; 
  }
  </style>
  