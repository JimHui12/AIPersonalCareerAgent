import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined

const axiosInstance = axios.create({
    ...(baseURL ? { baseURL } : {}),
    timeout: 10000,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status
        if (status === 401) {
            console.error('Unauthorized access')
        } else if (status === 404) {
            console.error('Not Found')
        } else {
            console.error('Request failed', error)
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
