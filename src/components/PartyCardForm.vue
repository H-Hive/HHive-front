// 파티 핵심정보만 표시하는 카드 폼
// 파티 전체 조회에서 가져온 데이터들로 중요 정보만 간략히 표시한다
// 파티 이름 + 파티 시간 + 멤버 수

<template>
  <div class="container">
<!--    <img src="" class="card-img-top" alt="..." /> 여기 사진 들어갈 듯-->
    <div class="title-container">
      <div
        class="title"
        @click="goToPartyPage(partyData.partyList[0].id, hiveId)"
      >
        {{ partyData.partyList[0].title }}
      </div>
      <div class="Line"></div>
      <div class="time">
        약속 일시: {{ partyData.partyList[0].dateTime }}
      </div>
    </div>
<!--      {{ partyData.partyList[0].content }}-->
<!--      <li class="list-group-item">Host:{{ partyData.user.username }}</li>-->
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

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: 1px solid grey; /* 테두리 추가 */
  border-radius: 10px; /* 컨테이너 모서리를 10px 둥글게 처리 */
  background-color: ivory;
}

.title {
  display: flex;
  height: 30px;
  align-items: center;
  font-weight: 700;
}

.Line{
  border: 0.5px solid grey;
  width: 100%;
}

.time{
  display: flex;
  height: 30px;
  align-items: center;
}

</style>