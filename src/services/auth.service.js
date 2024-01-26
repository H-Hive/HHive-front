import axios from 'axios';
// import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/api/users'
// const API_URL = 'https://hhive.shop/api/users'

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

  kakaoSignup

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

  doEmailConfirm(email) {
    return axios.post(API_URL + "/emailConfirm", {email: email}).then((response) => {
      console.log(response);
      alert("메일이 발송되었습니다!");
      window.location.reload();
    })
  }

  isLoggedIn() {
    
    return localStorage.getItem('userinfo');
  }
}

export default new AuthService();