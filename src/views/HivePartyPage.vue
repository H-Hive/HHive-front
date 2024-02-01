<template>
  <div class="body">
    <div class="board">파티 게시판 🎉</div>
    <div class="party">
      <div
          class="party-container"
          v-for="(partyData, index) in paginatedData"
          :key="index"
      >
        <PartyCardForm :partyData="partyData" :hiveId="this.hiveId" />
      </div>
    </div>
    <div class="pagination">
      <button
          v-for="page in totalPages"
          :key="page"
          @click="setPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import PartyCardForm from "@/components/PartyCardForm.vue";
import partyService from "@/services/party.service";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      partyDatas: [],
      currentPage: 1,
      itemsPerPage: 7,
    };
  },

  props: ["hiveId"],

  components: {
    PartyCardForm,
  },

  mounted() {
    if (!authService.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      partyService
        .getAllPartiesByHiveId(this.hiveId)
        .then((response) => {
          this.partyDatas = response.data["payload"];
          console.log("partyDatas = ", this.partyDatas);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },

  methods: {
    setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },

  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.partyDatas.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.partyDatas.length / this.itemsPerPage);
    },
  },

};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  margin-top: 65px;
  color: rgb(0, 0, 0);
  padding: 10px;
  background-color: rgb(255, 243, 161);
  justify-content: center;
}

.board{
  display: flex;
  margin-top: 100px;
  justify-content: center;
  font-size: 40px;
}

.party {
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  width: 50%;
  height: 500px;
}

.party-container {
  width: 100%;
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
}

.pagination button {
  margin-right: 10px;
}

</style>