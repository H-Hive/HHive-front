<template>
    <div>
      <input type="text" placeholder="우편 번호" v-model="zonecode" readonly />
      <button id="postcode" @click="openPostcode">검색</button><br />
      <input type="text" v-model="roadAddress" placeholder="주소" readonly />
    </div>
  </template>
  <script>
  export default {
    name: "PostCode",
    data() {
      return {
        zonecode: "",
        roadAddress: "",
      };
    },
    setup() {},
    created () {},
    mounted () {},
    unmounted () {},
  
    methods: {
      openPostcode() {
        new window.daum.Postcode ({
          oncomplete: (data) => {
            console.log(data);
            this.zonecode = data.zonecode;
            this.roadAddress = data.roadAddress;
  
            this.$emit('address-selected', this.zonecode, this.roadAddress, this.detailAddress);
          },
        }).open();
      },
    },
  };
  </script>