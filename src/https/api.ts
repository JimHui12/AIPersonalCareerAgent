import axiosInstance from "./axios";

export function get(url: string, params?: any) {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function post(url: string, data?: any) {
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, data)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
    })
}



export function deletes(url: string, params?: any) {
    return new Promise((resolve, reject) => {
        axiosInstance.delete(url, { params: params })
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
    })
}
