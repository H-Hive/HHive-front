<template>
  <div class="createhive-modal">
    <div class="modal-content">
      <span class="close" @click="closeModal" style="position: absolute; top: 0%; right: 2.5%; cursor: pointer;">&times;</span>
      <div>
        <div v-if="isTitle">
        <h2>모임 이름 변경</h2>
        <div class="line"></div>
        <div class="content-top">
          <label for="hiveTitle">모임 이름:</label>
          <input type="text" id="hiveTitle" v-model="hiveTitle" />
        </div>
      </div>
        <div v-if="!isTitle">
          <div class="content-top">
          <h2>모임 소개 변경</h2>
          <label for="hiveTitle">모임 소개:</label>
          <input type="text" id="hiveIntroduction" v-model="hiveIntroduction" />
        </div>
        </div>
        <div class="content-bottom">
          <p :class="{ 'hidden': !errorMessage, 'red': errorMessage }">{{ errorMessage }}</p>
          <button @click="updateHive" class="btn btn-outline-dark">변경 완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hiveService from '@/services/hive.service';

export default {
props: {
id: {
  type: Number, 
},
isInfo:{
  type:String,
  default: "title",   
}
},
data() {
  return {
    hiveTitle: "",
    hiveIntroduction:"",
    modalMessage: "",
    errorMessage: "",
    isTitle: true,
  };
},
methods: {
  updateHive() {
    if(this.isTitle==true){
      if (!this.hiveTitle) {
      this.errorMessage = '새 모임 이름을 입력해주세요.';
      return;
    }
    hiveService.updateHiveTitle(this.id,this.hiveTitle)
    .then((response) => {
      this.modalMessage = response.data.message;
      this.$emit('update-Success',this.modalMessage);
    })
    .catch((error) => {
      console.error(error);
      this.errorMessage = error.response.data.message;
    });
  }else{
    if (!this.hiveIntroduction) {
      this.errorMessage = '새 모임 소개를 입력해주세요.';
      return;
    }
    hiveService.updateHiveInfo(this.id,this.hiveIntroduction)
    .then((response) => {
      this.modalMessage = response.data.message;
      this.$emit('update-Success',this.modalMessage);
    })
    .catch((error) => {
      console.error(error);
      this.errorMessage = error.response.data.message;
    });
  }
},
  closeModal() {
    // 모달이 닫힐 때 이벤트 발생
    this.$emit('modal-Closed');
  },
},
mounted() {
  if(this.isInfo !== "title"){
    this.isTitle = false;
  }
}
};
</script>
<style scoped>
.createhive-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 500px; /* 모달의 너비 조절 */
  height: 400px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-content {
  text-align: center;
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

.line {
  border-bottom: 1px solid #000;
  margin-bottom: 15px;
}

.content-top {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.content-top input{
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 50%;
  height: 30px;
}

.content-bottom {
  width: 100%;

}

.hidden {
  margin-top: 40px;
}

</style>
