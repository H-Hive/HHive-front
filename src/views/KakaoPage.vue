<template>
  <div>
    카카오 로그인에 성공하셨습니다.카카오 로그인에 성공하셨습니다.카카오
    로그인에 성공하셨습니다.카카오 로그인에 성공하셨습니다.카카오 로그인에
    성공하셨습니다.카카오 로그인에 성공하셨습니다.카카오 로그인에
    성공하셨습니다.카카오 로그인에 성공하셨습니다.
  </div>
</template>

<script>
import authService from "@/services/auth.service";

export default {
  created() {
    if (authService.isLoggedIn()) {
      this.$router.push(`/`);
      return;
    }
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    authService.sendKakaoCode(code);
    alert("로그인이 완료되었습니다.");
    window.location.reload();
  },
};
</script>
