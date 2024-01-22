<template>
  <button @click="submitOrToggle">
    {{ isEditMode ? "수정 완료" : "프로필 수정" }}
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
