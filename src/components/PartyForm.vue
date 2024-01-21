// 파티에 대한 상세 정보를 보여주는 페이지
// 파티에 대한 상세 정보(파티 조회) + 파티 가입/탈퇴 버튼(가입 여부에 따라 다름 눌렀을 시 정말 하시겠습니까 모달 창 뜸)

<template>
  <div>
    <div v-if="partyData">
      <h1>파티 이름: {{ partyData.title }}</h1>
      <h1>파티 주최자: {{ partyData.username }}</h1>
      <h1>파티 내용: {{ partyData.content }}</h1>
      <h1>파티 일시: {{ partyData.dateTime }}</h1>
      <h1>여기 멤버 수만 넣을까?</h1>
    </div>
  </div>
</template>

<script>
import partyService from "../services/party.service";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      partyData: {},
    };
  },

  props: ["hiveId", "partyId"],

  components: {},

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      partyService
        .getParty(this.hiveId, this.partyId)
        .then((response) => {
          this.partyData = response.data["payload"];
          console.log("partyDatas = ", JSON.stringify(this.partyData, null, 2));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>
</style>
