import type { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from "./axiosRequestsInterceptor";

export function get(url: string, params?: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {
            params: params
        }).then((res: AxiosResponse) => {
            resolve(res.data)
        }).catch((err: AxiosError) => {
            reject(err.response?.data || err.message)
        })
    })
}

export function post(url: string, data?: unknown) {
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, data)
            .then((res: AxiosResponse) => {
                resolve(res.data)
            }).catch((err: AxiosError) => {
                reject(err.response?.data || err.message)
            })
    })
}



export function deletes(url: string, params?: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
        axiosInstance.delete(url, { params: params })
            .then((res: AxiosResponse) => {
                resolve(res.data)
            }).catch((err: AxiosError) => {
                reject(err.response?.data || err.message)
            })
    })
}
