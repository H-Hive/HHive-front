<template>
  <div class="body">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="검색어 입력" aria-label="Recipient's username"
        aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">조회</button>
    </div>
    <div>
      <button type="button" class="btn btn-outline-dark">전체</button>
      <button type="button" class="btn btn-outline-dark">운동</button>
      <button type="button" class="btn btn-outline-dark">아웃도어/여행</button>
      <button type="button" class="btn btn-outline-dark">음악/악기</button>
      <button type="button" class="btn btn-outline-dark">봉사활동</button>
      <button type="button" class="btn btn-outline-dark">댄스/무용</button>
      <button type="button" class="btn btn-outline-dark">사교/인맥</button>
      <button type="button" class="btn btn-outline-dark">사진/영상</button>
      <button type="button" class="btn btn-outline-dark">반려동물</button>
    </div>
    <div class="hives">
      <template v-for="(hiveData, index) in hiveDatas" :key="index">
        <div class="hive-card">
          <HiveCardForm :hiveData="hiveData" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import hiveService from "../services/hive.service";
import HiveCardForm from "@/components/HiveCardForm.vue";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      hiveDatas: "",
    };
  },

  components: {
    HiveCardForm,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      hiveService
        .getAllHives()
        .then((response) => {
          this.hiveDatas = response.data["payload"];
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>
.form-control {
  margin: auto;

  background-color: rgba(247, 246, 243, 0.5);
  ;
}


.btn {
  margin: 5px 5px;

}

.hives {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  background-size: contain;

}

.body {
  padding: 0px 50px 0px 100px;
}

.hive-card {
  flex: 0 0 24%;
  max-width: 24%;
  margin: 1%;
}
</style>