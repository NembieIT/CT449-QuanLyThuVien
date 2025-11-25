import axios from "axios";

export default (baseURL) => {
    const instance = axios.create({
        baseURL: `http://localhost:3001${baseURL}`,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })
    instance.interceptors.response.use(
        (res) => {
            if (res.status === 204) {
                console.log('vao res 204')
                localStorage.removeItem('accessToken');
                window.location.href = '/auth';
            }
            return res;
        },
        (err) => {
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem('accessToken');
                window.location.href='/auth'
            }
            return Promise.reject(err);
        }
    )
    return instance;
}