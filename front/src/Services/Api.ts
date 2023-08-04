import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from "../utils/config";
import {store} from "../stores/store";


const api: AxiosInstance = axios.create({
    baseURL: BASE_URL, // Replace this with your API base URL
});


api.interceptors.request.use(
    (config) => {
        const token = store.getState().userData.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
