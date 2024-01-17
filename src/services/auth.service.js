import axios from 'axios';
import Cookies from 'js-cookie';

// const API_URL = 'http://localhost:8082/api/users'
const API_URL = 'http://15.165.158.12/api/users'

let userInfoCookieName = 'userinfo';

function isUserInfoCookieExist() {

  return Cookies.get(userInfoCookieName);
}

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.headers) {
          // console.log(response.data);
          // localStorage.setItem('user', JSON.stringify(response.data['payload']));
          // localStorage.setItem('Authorization', response.headers['authorization']);
        }

        return response.data;
      }); 
  }

  logout() {
    console.log(document.cookie);
    // 모든 쿠키 가져오기
    var cookies = document.cookie.split(";");

    // 각 쿠키를 반복하며 만료일을 현재 시간 이전으로 설정하여 삭제
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  register(user) {
    return axios.post(API_URL + '/signup', {
      username: user.username,
      password: user.password,
      checkPassword: user.checkPassword,
      email: user.email,
      description: user.description
    });
  }

  isLoggedIn() {
    
    return isUserInfoCookieExist();
  }
}

export default new AuthService();