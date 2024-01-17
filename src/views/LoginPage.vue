<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">아이디: </label>
      <input id="username" type="text" v-model="username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input id="password" type="password" v-model="password">
    </div>
    <button type="submit">로그인</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data: function() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submitForm: function() {
      // event.preventDefault();
      const url = '/api/users/login';
      const data = {
        username: this.username,
        password: this.password
      }
      axios.post(url, data)
        .then(function(response) {
          console.log(response.headers['authorization']);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
}
</script>

<style>


</style>