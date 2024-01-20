<template>
  <div class="container">
    <header class="jumbotron">
      <h2>프로필</h2>
    </header>
    <div>
      <img type="button" class="myimg" alt="HTML" src="../images/userlogo.png">
    </div>
    <div class="userinfo">
      <h3>
        <strong>{{ profileData.username }}</strong>
      </h3>
      <p>
        서울특별시 / 1993.1.29
      </p>
      <h5>
        <strong>Email : </strong>
        {{ profileData.email }}
      </h5>
      <h5>
        <strong>자기소개 : </strong>
        {{ profileData.description }}
      </h5>
    </div>
    
    <br />
    <div>
      <div>
        <h6>내가 참여한 모임들</h6>
      </div>
      <!-- 로그인 되어있다면 내가 가입한 하이브들 보여주기 -->
      <div v-if="loggedIn">로그인 되어있기 않기 때문에 내 하이브들이 뜬다</div>
      <MyHivePage v-if="loggedIn" />

      <!-- 로그인되어있지 않다면 로고와 회원가입 링크 보여주기 -->
      <router-link to="/register" v-if="!loggedIn">
        회원가입으로 HHive 시작하기 (로그인 안된 상황에서 떠야함)
      </router-link>
    </div>


  </div>
</template>

<script>
import userService from "@/services/user.service";
import authService from "@/services/auth.service";

export default {
  name: "profile-form",
  data() {
    return {
      profileData: {},
    };
  },
  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      userService
        .getProfile()
        .then((response) => {
          this.profileData = response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style>
.myimg {
  width: 140px;
  height: 140px;
  float: left;

}

.userinfo {
  width: 500px;
  margin: 5px 0px 0px 150px ;

}
</style>