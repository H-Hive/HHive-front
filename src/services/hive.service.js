import axios from 'axios';

// const API_URL = 'http://localhost:8082/api/hives'
const API_URL = 'http://15.165.158.12/api/hives'

class HiveService {

  getAllHives() {

    return axios.get(API_URL)
  }

}

export default new HiveService();