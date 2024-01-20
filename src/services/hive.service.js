import axios from 'axios';
import userService from './user.service';

const API_URL = 'http://localhost:8080/api/hives'
// const API_URL = 'https://hhive.shop/api/hives'

class HiveService {

  getAllHives() {

    return axios.get(API_URL, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  getHive(hiveId) {

    return axios.get(API_URL + `/${hiveId}`);
  }

  joinHive(hiveId) {

    const email = userService.getUserInfo()['email'];

    return axios.post(API_URL + `/${hiveId}`, {
      email: email
    })
  }

}

export default new HiveService();