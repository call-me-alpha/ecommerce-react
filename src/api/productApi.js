import axiosClient from './axiosClient'
const url = 'products'
const productApi = {
    getAll() {
        return axiosClient.get(url)
    },
    getOne(id) {
        return axiosClient.get(`${url}/${id}`)
    },
    create(data) {
        return axiosClient.post(url, data)
    },
    update(id, data) {
        return axiosClient.put(`${url}/${id}`, data)
    },
    delete(id) {
        return axiosClient.delete(`${url}/${id}`)
    }
}

export default productApi
