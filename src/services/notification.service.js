import axios from "axios";

// const API_URL = 'http://localhost:8080/api/notifications'
const API_URL = 'https://hhive.shop/api/notifications'

class notificationService{
    getEmitter(userId){
        return new EventSource(
            API_URL + `/${userId}`
          );
    }

    getAllNotifications(){
        return axios.get(API_URL ,{headers: {'Authorization': localStorage.getItem("token")}});
    }
    getAllNotificationsCount(){
        return axios.get(API_URL+"/unread", {headers: {'Authorization': localStorage.getItem("token")}});
    }
    readNotification(){
        return axios.patch(API_URL +"/read",{}, {headers: {'Authorization': localStorage.getItem("token")}});
    }
    sendNotification(Notmessage,groupId,groupType){
        return axios.post(API_URL,
        {
            message:Notmessage,
            id:groupId,
            type:groupType
        }
        ,{headers: {'Authorization': localStorage.getItem("token")}});
    }


      

}
export default new notificationService();