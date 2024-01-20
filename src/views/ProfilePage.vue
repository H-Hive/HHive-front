<template>
  <ProfileForm :userId="userId" />
</template>

<script>
import ProfileForm from "@/components/ProfileForm.vue";

export default {
  props: ["userId"],

  mounted() {
    console.log("userId at ProfilePage: ", this.userId);
  },

  components: {
    ProfileForm,
  },
};
</script>