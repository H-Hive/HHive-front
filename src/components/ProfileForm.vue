<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ profileData.username }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Email:</strong>
      {{ profileData.email }}
    </p>
    <p>
      <strong>Description:</strong>
      {{ profileData.description }}
    </p>
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

<style></style>