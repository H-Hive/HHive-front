<template>
  <button @click="submitOrToggle">
    {{ isEditMode ? "수정완료" : "수정하기" }}
  </button>
</template>

<script>
export default {
  props: {
    isEditMode: Boolean,
  },
  methods: {
    submitOrToggle() {
      this.$emit("submitOrToggle");
    },
  },
};
</script>
