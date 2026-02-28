import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，例如添加认证令牌
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        // 请求错误处理
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        // 对响应数据做点什么，例如统一处理响应格式
        return response;
    },
    error => {
        // 对响应错误做点什么，例如统一处理错误状态码
        if (error.response && error.response.status === 401) {
            // 例如，处理401未授权错误，可以重定向到登录页面等
            console.error('Unauthorized access');
        } else if (error.response && error.response.status === 404) {
            console.error('Not Found');
        } else {
            console.error('Something went wrong', error);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
