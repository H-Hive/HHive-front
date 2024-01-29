import axios from 'axios';
import userService from './user.service';
// import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/api/users'
const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=3fe6481f8db240a6d244c091c05a9181&redirect_uri=http://localhost:8082/kakao-login'
// const API_URL = 'https://hhive.shop/api/users'
// const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=3fe6481f8db240a6d244c091c05a9181&redirect_uri=https://hhive.store/kakao-login'
// let userInfoCookieName = 'userinfo';

class AuthService {

  signup(user) {  
    return axios
    .post(API_URL + '/signup', {
      username: user.username,
      password: user.password,
      checkPassword: user.checkPassword,
      email: user.email,
      description: user.description,
    })
    .then(response => {
      console.log(response);
      return response;
    })
  }

  kakaoLogin() {
    
    window.location.href = KAKAO_AUTH_URL;
  }

  sendKakaoCode(code) {
    console.log("카카오 로그인 시도");

    return axios.get(API_URL + '/kakao/callback?code=' + `${code}`)
    .then(response => {
      console.log("카카오 로그인: ", response);
      localStorage.setItem(
        "userinfo",
        JSON.stringify(response.data["payload"])
      );
      localStorage.setItem(
        "token",
        response.headers.get("Authorization")
      );
      localStorage.setItem(
        "kakaoUser",
        true
      );
    });
  }

  login(user) {
    return axios
      .post(API_URL + '/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        console.log(response);
        localStorage.setItem(
          "userinfo",
          JSON.stringify(response.data["payload"])
        );
        localStorage.setItem(
          "token",
          response.headers.get("Authorization")
        );
        return response;
      }); 
  }

  logout() {

    //헤더 버전
    localStorage.removeItem('userinfo');
    localStorage.removeItem('token');
    localStorage.removeItem('kakaoUser');

    // // 모든 쿠키 가져오기
    // var cookies = document.cookie.split(";");

    // // 각 쿠키를 반복하며 만료일을 현재 시간 이전으로 설정하여 삭제
    // for (var i = 0; i < cookies.length; i++) {
    //     var cookie = cookies[i];
    //     var eqPos = cookie.indexOf("=");
    //     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // }
    window.location.reload();
  }

  requestVerificationCode(email) {

    const userId = userService.getUserId();
    console.log(userId);

    return axios.post(API_URL + `/${userId}` + "/email-verification", {email: email}).then((response) => {
      console.log(response);
      alert("메일이 발송되었습니다!");
    })
    .catch((error) => {console.log(error)})
  }

  sendVerificationCode(email, verificationCode) {

    const userId = userService.getUserId();

    return axios.post(API_URL + `/${userId}` + "/email-verification" + "/verify", {email: email, verificationCode: verificationCode})
    .then((response) => {
      console.log(response);
      alert("이메일 인증에 성공하셨습니다.");
      window.location.reload();
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  }

  isLoggedIn() {
    
    return localStorage.getItem('userinfo');
  }
}

export default new AuthService();