import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.15.144:3333',
    //baseurl: 'http://10.0.2.2:3333', para android emulator
});

export default api;
