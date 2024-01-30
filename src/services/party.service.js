import axios from 'axios';

const API_URL = 'http://localhost:8080/api/parties'
// const API_URL = 'https://hhive.shop/api/parties'

class PartyService {

  //이거 수정 시에 하이브 페이지에서의 함수도 바꿔주기
  getAllPartiesByHiveId(hiveId) {

    return axios.get(API_URL + `/${hiveId}`, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  createParty(data, hiveId) {
    console.log(data, hiveId);

    return axios.post(API_URL + `/hives` + `/${hiveId}`, data, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  getParty(hiveId, partyId) {

    return axios.get(API_URL + `/${partyId}` + "/hives" + `/${hiveId}`, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  updateParty(data, partyId) {

    return axios.patch(API_URL + `/${partyId}`, data, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  deleteParty(partyId) {

    return axios.delete(API_URL + `/${partyId}`, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  joinParty(partyId) {
    return axios.post(API_URL + `/${partyId}` + "/join",{},{headers: {'Authorization': localStorage.getItem("token")}});
  }

  resignParty(partyId) {

    return axios.delete(API_URL + `/${partyId}` + "/resign", {headers: {'Authorization': localStorage.getItem("token")}});
  }

}

export default new PartyService();