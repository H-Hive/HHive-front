// 하이브에 대한 상세 정보를 보여주는 페이지
// 하이브에 대한 상세 정보(하이브 조회) + 개설된 파티 목록(파티 전체 조회 + 눌렀을 시 파티 조회) + 채팅방(미구현) + 하이브 탈퇴 버튼(눌렀을 시 정말 하시겠습니까 뜨고 하이브 탈퇴)
// 만약 하이브에 가입된 상태가 아니라면 -> 하이브에 대한 상세 정보만 + 하이브 가입 버튼이 생기기

<template >
  <div class="body">
    <div>
      <button type="button" class="btn btn-outline-dark">홈</button>
      <button type="button" class="btn btn-outline-dark">게시판</button>
      <button type="button" class="btn btn-outline-dark">사진첩</button>
      <button type="button" class="btn btn-outline-dark">채팅</button>
    </div>
    <div v-if="hiveData">
      <h1 class="title">{{ hiveData.title }}</h1>
      <p class="hostName">방장 : {{ hiveData.hostName }}</p>
      <h5 class="Data">{{ hiveData.introduction }}</h5>
    </div>
    <div class="container">
      <div class="row row-cols-2">
        <div class="col">
          <h2 class="title text-center">정기모임</h2>
          <div class="regularmeeting">
            <div class="regularmeetingdetail">
              <h4>일시 : 2024.03.05</h4>
              <h4>내용 : 스파르타 수료파티</h4>
              <h4>위치 : 서울시 강남구 한신포차</h4>
              <h4>참석 : 4/20</h4>
            </div>
            <div class="d-grid gap-2 d-md-block">
              <button
                type="button"
                class="btn btn-primary"
                style="
                  --bs-btn-padding-y: 0.5rem;
                  --bs-btn-padding-x: 1rem;
                  --bs-btn-font-size: 1rem;
                  margin: 10px 10px 10px 30px;
                  width: auto;
                "
              >
                참여하기 !!
              </button>
              <button
                type="button"
                class="btn btn-primary"
                style="
                  --bs-btn-padding-y: 0.5rem;
                  --bs-btn-padding-x: 1rem;
                  --bs-btn-font-size: 1rem;
                  margin: 10px 10px 10px 10px;
                  width: auto;
                "
              >
                다음 기회에...
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <h2 class="title text-center">게시판</h2>

          <div class="board">
            <div class="card">
              <div type="button" class="card-body">
                [공지] 우리동네 모임에 오신걸 환영합니다!
              </div>
            </div>
            <div class="card">
              <div type="button" class="card-body">
                [공지] 모임 시 주의사항!!!
              </div>
            </div>
            <div class="card">
              <div type="button" class="card-body">
                [공지] 이번주 행운의 주인공!!!
              </div>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary"
                style="
                  --bs-btn-padding-y: 0.5rem;
                  --bs-btn-padding-x: 1rem;
                  --bs-btn-font-size: 1rem;
                  margin: 10px 10px 10px 10px;
                  width: auto;
                "
              >
                더 보러가기
              </button>
            </div>
          </div>
          <div>
            <JoinButton :property="'Hive'" :id="hiveData.id" />
          </div>
        </div>
      </div>
    </div>

    <!-- 추후 하이브 파티 전체조회 나오면 메소드랑 같이 수정할 것 -->
    <div v-for="(partyData, index) in partyDatas" :key="index">
      <PartyCardForm :partyData="partyData" :hiveId="this.id" />
    </div>
    <!-- <div>
      <PartyCardForm :partyData="this.partyDatas" />
    </div> -->
  </div>
</template>

<script>
import PartyCardForm from "../components/PartyCardForm.vue";
import hiveService from "../services/hive.service";
import authService from "@/services/auth.service";
import partyService from "@/services/party.service";
import JoinButton from "@/components/JoinButton.vue";

export default {
  data() {
    return {
      hiveData: {},
      partyDatas: {},
    };
  },

  props: ["id"],

  components: {
    PartyCardForm,
    JoinButton,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      hiveService
        .getHive(this.id)
        .then((response) => {
          this.hiveData = response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
      partyService
        .getAllPartiesByHiveId(this.id)
        .then((response) => {
          this.partyDatas = response.data["payload"];
          console.log("partyDatas = ", this.partyDatas);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>
.btn {
  width: 100px;
  margin: 10px 30px;
}

.body {
  width: 100%;
  color: rgb(0, 0, 0);

  background-image: url("../images/HiveBackground.png");
  background-position: center;
  background-size: cover;
}

.btn {
  margin: 10px 10px 10px 10px;
}

.regularmeeting {
  width: 90%;
  height: auto;

  border-radius: 5px;
  margin: 0x 10px 10px 15px;

  background-color: rgb(212, 206, 231);
}

.regularmeetingdetail {
  margin: 10px 10px 10px 20px;
}

.regularmeetingdetail {
  padding: 30px 15px 0px 15px;
}

.board {
  width: 90%;
  height: auto;

  border-radius: 5px;
  margin: 10px 10px 10px 10px;
  background-color: rgb(212, 206, 231);
}

.card {
  margin: 5px 5px 5px 5px;
  --bs-btn-padding-y: 0.5rem;
  --bs-btn-padding-x: 1rem;
  --bs-btn-font-size: 1rem;
}

.card-body {
  margin: auto;
  padding: auto;
}
</style>
