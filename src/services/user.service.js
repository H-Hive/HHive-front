import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';
// const API_URL = 'https://hhive.shop/api/users';

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if(parts.length === 2) return parts.pop().split(';').shift();
// }

class UserService {
  getPublicContent() {
    
    if(this.getUserInfo == null) return null;

    //추후 내가 가입된 하이브들만 가져오게끔
    return axios.get(API_URL + '/all');
  }

  getProfile(userId) {
    
    return axios.get(API_URL + `/${userId}`);
  }

  updatePassword(userId, data) {

    return axios.patch(API_URL + `/${userId}` + "/password", data, {headers: {'Authorization': localStorage.getItem("token")}})
  }

  getMyHives(userId) {

    return axios.get(API_URL + `/${userId}` + '/hives');
  }

  modifyProfile(userId, profileData) {

    return axios.patch(API_URL + `/${userId}`, 
     {
      email: profileData.email,
      description: profileData.description,
    }, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  deleteUser(userId) {

    return axios.delete(API_URL + `/${userId}`, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  updateUserCategory(userId, majorCategory, subCategory) {

    return axios.post(API_URL + `/${userId}` + "/category", {majorCategory: majorCategory, subCategory: subCategory}, {headers: {'Authorization': localStorage.getItem("token")}})
  }

  //쿠키에서 유저 정보 추출 json 형식으로 반환.
  getUserInfo() {
    // const cookieName = 'userinfo';
    // const cookieValue = getCookie(cookieName);

    // if (cookieValue) {
    //   // Base64 디코딩
    //   console.log("Success readCookie: ", cookieValue)
    //   const decodedUserInfo = atob(cookieValue);

    //   // JSON 파싱
    //   const userInfoObject = JSON.parse(decodedUserInfo);

    //   return userInfoObject;
    // } else {
    //   return null;
    // }
    return JSON.parse(localStorage.getItem('userinfo'));
  }

  getUserId() {
    return this.getUserInfo()['userId'];
  }
}

export default new UserService();