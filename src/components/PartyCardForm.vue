// 파티 핵심정보만 표시하는 카드 폼
// 파티 전체 조회에서 가져온 데이터들로 중요 정보만 간략히 표시한다
// 파티 이름 + 파티 시간 + 멤버 수

<template>
  <div class="card">
<!--    <img src="" class="card-img-top" alt="..." /> 여기 사진 들어갈 듯-->
    <div class="card-body">
      <p
        class="card-title"
        @click="goToPartyPage(partyData.partyList[0].id, hiveId)"
      >
        {{ partyData.partyList[0].title }}
      </p>
<!--      {{ partyData.partyList[0].content }}-->
    </div>
<!--    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        약속 일시: {{ partyData.partyList[0].dateTime }}
      </li>
      <li class="list-group-item">Host:{{ partyData.user.username }}</li>
    </ul>-->
  </div>
</template>

<script>
export default {
  name: "party-card-form",

  props: ["hiveId", "partyData"],

  methods: {
    goToPartyPage(partyId, hiveId) {
      this.$router.push(`/party/${hiveId}/${partyId}`);
    },
  },

  mounted() {},
};
</script>

<style scoped>

.card {
}
</style>