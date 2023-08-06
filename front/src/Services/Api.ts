import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from "../utils/config";
import {store} from "../stores/store";

import authService from "./AuthService";


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

api.interceptors.response.use(
    response => response,
    error => {
        debugger;
        if (error.response.status === 401 && error.response.data.message === 'Invalid token') {
            authService.signOut();
        }
        return error
    }
)

export default api;
