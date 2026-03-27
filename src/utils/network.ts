import axios from 'axios';
import session from './session';



const network = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});


network.interceptors.request.use((config) => {
    const token = session.getSession();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }


    return config;
}, (error) => {

    return Promise.reject(error);
});

network.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status == 401) {
        console.log("Token tidak valid, sesi akan dihapus");
        session.clearSession();
    }

    console.log("network error: ", error)

    return Promise.reject(error);
})


export default network;