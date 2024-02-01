// 파티 핵심정보만 표시하는 카드 폼
// 파티 전체 조회에서 가져온 데이터들로 중요 정보만 간략히 표시한다
// 파티 이름 + 파티 시간 + 멤버 수

<template class="body">
  <div class="container">
    <header class="jumbotron">
      <h5 class="card-title" @click="goToPartyPage(partyData.id,partyData.hiveId)">
            <button type="button" >
              {{ partyData.title }}
            </button>
          </h5>
    </header>
    <p>
      <strong>content:</strong>
      {{ partyData.content }}
    </p>
    <p>
      <strong>host:</strong>
      {{ partyData.username }}
    </p>
  </div>
</template>

<script>
export default {
  name: "party-card-form",

  props: ["partyData"],

  methods: {
    goToPartyPage(partyId,hiveId) {
      this.$router.push(`/party/${hiveId}/${partyId}`);
    },
  },

  mounted() {
  },
};
</script>

<style scoped>
  .container {
    width: 500px;
    border: 2px solid orange;
    border-radius: 15px;
    margin: 20px 10px 10px 10px;
    background-color: ivory;
    max-height: 150px; /* 최대 높이 설정 */
    overflow-y: auto; /* 세로 스크롤바가 필요할 때만 표시 */
  }
  .jumbotron{
    padding: 10px;
  }

</style>