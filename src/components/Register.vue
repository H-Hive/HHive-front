<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
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
            <label for="checkpassword">비밀번호 확인</label>
            <Field name="checkPassword" type="password" class="form-control" />
            <ErrorMessage name="checkPassword" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="description">자기소개</label>
            <Field name="description" type="text" class="form-control" />
            <ErrorMessage name="description" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>

      <AlertModal
        :is-visible="isModalVisible"
        :message="modalMessage"
        @closeAndRedirect="closeModalAndRedirect"
      />

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AlertModal from "@/components/AlertModal.vue";

export default {
  name: "register-form",
  components: {
    Form,
    Field,
    ErrorMessage,
    AlertModal,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("필수 입력사항입니다.").min(4).max(10),
      password: yup.string().required("필수 입력사항입니다.").min(4),
      checkPassword: yup.string().required("필수 입력사항입니다.").min(4),
      email: yup.string().required("필수 입력사항입니다.").email(),
      description: yup.string().required("필수 입력사항입니다."),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      isModalVisible: false,
      modalMessage: "",
      redirectPath: "/",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      //auth.module.js 에 있는 register 함수를 실행시킴
      //그런데 user.username 등등에 정보가 안 담겨서 보내지지가 않는 듯
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.showModal("회원가입이 성공했습니다.", "/");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
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
      this.isModalVisible = false;
      this.$router.push({ path: this.redirectPath });
    },
  },
};
</script>

<style scoped>
</style>