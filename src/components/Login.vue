<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">아이디</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
    <AlertModal
      :is-visible="isModalVisible"
      :message="modalMessage"
      @closeAndRedirect="closeModalAndRedirect"
    />
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AlertModal from '@/components/AlertModal.vue';
import userService from '@/services/user.service.js';
import Cookies from 'js-cookie';

export default {
  name: "login-form",
  components: {
    Form,
    Field,
    ErrorMessage,
    AlertModal,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      isModalVisible: false,
      modalMessage: '',
      redirectPath: '/',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {

    handleLogin(user) {
      this.loading = true;
      console.log('Logging in with user:', user);

      this.$store.dispatch("auth/login", user).then(
        () => {
          // this.$router.push("/profile");
          console.log(userService.getUserInfo());
          this.showModal('로그인이 성공했습니다.', '/profile');
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },

    showModal(message, redirectPath) {
      // 모달을 표시하고 메시지 설정
      this.isModalVisible = true;
      this.modalMessage = message;
      this.redirectPath = redirectPath;
    },

    closeModalAndRedirect() {
      // 모달 닫기
      console.log(Cookies.get('userinfo'));
      this.isModalVisible = false;
      this.$router.push({path: this.redirectPath});
    },
  },
};
</script>

<style scoped>
</style>