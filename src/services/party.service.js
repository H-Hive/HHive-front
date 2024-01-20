import axios from 'axios';

const API_URL = 'http://localhost:8080/api/parties'
// const API_URL = 'https://hhive.shop/api/parties'

class PartyService {

  //이거 수정 시에 하이브 페이지에서의 함수도 바꿔주기
  getAllPartiesByHiveId() {

    return axios.get(API_URL);
  }

  getParty(partyId) {

    return axios.get(API_URL + `/${partyId}`);
  }

  joinParty(partyId) {

    return axios.post(API_URL + `/${partyId}` + "/join");
  }

}

export default new PartyService();