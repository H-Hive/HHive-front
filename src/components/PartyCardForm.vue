// 파티 핵심정보만 표시하는 카드 폼
// 파티 전체 조회에서 가져온 데이터들로 중요 정보만 간략히 표시한다
// 파티 이름 + 파티 시간 + 멤버 수

<template>
  <div class="card" style="width: 18rem">
    <img src="" class="card-img-top" alt="..." /> 여기 사진 들어갈 듯
    <div class="card-body">
      <h5 class="card-title" @click="goToPartyPage(partyData.id)">
        {{ partyData.title }} 여기 누르면 이동
      </h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ partyData.dateTime }}</li>
      <li class="list-group-item">Host:</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "party-card-form",
  props: {
    partyData: {
      type: Object,
    },
  },

  methods: {
    goToPartyPage(partyId) {
      this.$router.push(`/party/${partyId}`);
    },
  },

  mounted() {},
};
</script>

<style scoped>
</style>