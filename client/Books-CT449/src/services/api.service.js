import axios from "axios";
import router from '../router/index';

export default (baseURL) => {
    const instance = axios.create({
        baseURL: `http://localhost:3001${baseURL}`,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    instance.interceptors.request.use((config) => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })
    instance.interceptors.response.use(
        (res) => {
            if (res.status === 204) {
                sessionStorage.removeItem('accessToken');
                router.push('/auth');
            }
            return res;
        },
        (err) => {
            if (err.response?.status === 401 || err.response?.status === 403) {
                sessionStorage.removeItem('accessToken');
                router.push('/auth');
            }
            return Promise.reject(err);
        }
    )
    return instance;
}