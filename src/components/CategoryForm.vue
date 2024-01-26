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
.major-category {
 margin-right: 10px;
 padding: 8px; 
 font-size: 14px; 
}
.sub-category {
 padding: 8px; 
 font-size: 14px; 
}
</style>