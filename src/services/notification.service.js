import axios from "axios";

const API_URL = 'http://localhost:8080/api/notifications'
// const API_URL = 'http://15.165.158.12/api/notifications'

class notificationService{

    getAllNotifications(){
        return axios.get(API_URL +"/getAll", {headers: {'Authorization': localStorage.getItem("token")}});
    }
    getAllNotificationsCount(){
        return axios.get(API_URL+"/count", {headers: {'Authorization': localStorage.getItem("token")}});
    }
    readNotification(){
        return axios.get(API_URL +"/read", {headers: {'Authorization': localStorage.getItem("token")}});
    }


      

}
export default new notificationService();