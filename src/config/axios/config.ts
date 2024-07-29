import axios, {AxiosInstance} from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000
});

export default api;
