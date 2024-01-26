<template>
  <select class="major-category" v-model="selectedMajorCategory" @change="updateSubCategories">
     <option disabled value="">메인 카테고리를 선택하세요</option>
     <option v-for="majorCategory in majorCategories" :key="majorCategory" :value="majorCategory">
       {{ majorCategory }}
     </option>
   </select>
   <div>
     <select v-if="subCategories.length > 0" class="sub-category" v-model="selectedSubCategory" @change="selectAllCategories">
       <option disabled value="">서브 카테고리를 선택하세요</option>
       <option v-for="subCategory in subCategories" :key="subCategory" :value="subCategory">
         {{ subCategory }}
       </option>
     </select>
 </div>
</template>

<script>
import axios from 'axios';

export default {
 data() {
   return {
     majorCategories: [],
     selectedMajorCategory: '',
     selectedSubCategory: '',
     subCategories: [],
     API_URL: 'http://localhost:8080/api/categories',
   };
 },
 methods: {
   updateSubCategories() {
     const selectedMajorCategory = this.selectedMajorCategory;
     if (selectedMajorCategory) {
       const selectedMajorCategoryData = this.allCategories[selectedMajorCategory];
       this.subCategories = selectedMajorCategoryData ? [...selectedMajorCategoryData] : [];
       this.$emit('categories-selected',this.selectedMajorCategory);
     } else {
       this.subCategories = [];
     }
   },
   selectAllCategories(){
    this.$emit('categories-selected',this.selectedMajorCategory,this.selectedSubCategory);
   },
   getAllCategories() {
     axios.get(this.API_URL, { headers: { 'Authorization': localStorage.getItem("token") } })
       .then(response => {
         this.allCategories = response.data.payload;
         this.majorCategories = Object.keys(this.allCategories);
       })
       .catch(error => {
         console.error('카테고리 정보 오류', error);
       });
   },
 },
 created() {
   this.getAllCategories();
 },
};
</script>

<style scoped>
.major-category{
  padding: 6px;
  font-size: 14px;
  border: 1px solid grey; /* 기본 테두리 적용 */
  border-radius: 4px; /* 테두리 둥글기 */
  outline: none; /* 클릭 시 기본 윤곽선 제거 */
}
.sub-category {
  padding: 6px;
  font-size: 14px;
  margin-top: 10px;
  border: 1px solid grey; /* 기본 테두리 적용 */
  border-radius: 4px; /* 테두리 둥글기 */
  outline: none; /* 클릭 시 기본 윤곽선 제거 */
}

</style>