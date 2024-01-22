import axios from 'axios';
import userService from './user.service';

const API_URL = 'http://localhost:8080/api/hives'
// const API_URL = 'https://hhive.shop/api/hives'

class HiveService {

  getAllHives() {

    return axios.get(API_URL, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  getHive(hiveId) {

    return axios.get(API_URL + `/${hiveId}`, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  joinHive(hiveId) {

    const email = userService.getUserInfo()['email'];

    return axios.post(API_URL + `/${hiveId}`, {
      email: email
    }, {headers: {'Authorization': localStorage.getItem("token")}})
  }

  resignHive(hiveId) {

    const username = userService.getUserInfo()['username'];

    return axios.delete(API_URL + `/${hiveId}` + "/hiveUsers" + `?username=${username}`, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  isHiveUser(hiveId) {

    const username = userService.getUserInfo()['username'];

    return axios.get(API_URL + `/${hiveId}` + "/hiveUsers" + "/search" + `?username=${username}`, {
      headers: {'Authorization': localStorage.getItem("token")}
    })
    .then(response => {
      console.log("data = ", response.data);
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
  }
}

export default new HiveService();