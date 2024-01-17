import axios from 'axios';

// const API_URL = 'http://localhost:8082/api/users/';
const API_URL = 'http://15.165.158.12/api/users/';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if(parts.length === 2) return parts.pop().split(';').shift();
}

class UserService {
  getPublicContent() {
    
    if(this.getUserInfo == null) return null;

    //추후 내가 가입된 하이브들만 가져오게끔
    return axios.get(API_URL + 'all');
  }

  getProfile() {
    const userId = this.getUserInfo()['userId'];
    
    return axios.get(API_URL + `${userId}`);
  }

  getMyHives(userId) {

    return axios.get(API_URL + `/${userId}` + '/hives')
  }

  //쿠키에서 유저 정보 추출 json 형식으로 반환.
  getUserInfo() {
    const cookieName = 'userinfo';
    const cookieValue = getCookie(cookieName);

    if (cookieValue) {
      // Base64 디코딩
      const decodedUserInfo = atob(cookieValue);

      // JSON 파싱
      const userInfoObject = JSON.parse(decodedUserInfo);

      return userInfoObject;
    } else {
      return null;
    }
  }
}

export default new UserService();