// 파티에 대한 상세 정보를 보여주는 페이지
// 파티에 대한 상세 정보 PartyForm(파티 조회) + 파티 가입/탈퇴 버튼(가입 여부에 따라 다름 눌렀을 시 정말 하시겠습니까 모달 창 뜸)

<template>
  <div class="party-container">
    <PartyForm :hiveId="this.hiveId" :partyId="this.partyId" />
  </div>
</template>

<script>
import authService from "@/services/auth.service";
import PartyForm from "@/components/PartyForm.vue";
import hiveService from "@/services/hive.service";

export default {
  data() {
    return {};
  },

  props: ["hiveId", "partyId"],

  created() {
    hiveService.isHiveUser(this.hiveId).then((result) => {
      if (result) {
        this.isHiveUser = true;
      } else {
        this.isHiveUser = false;
      }
    });
  },

  components: {
    PartyForm,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>

.party-container {
  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬 */
  justify-content: center; /* 가로 방향에서 중앙 정렬 */
  margin-top: 150px;
}

</style>