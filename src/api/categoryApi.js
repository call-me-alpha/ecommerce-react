import axiosClient from './axiosClient'
const url = 'categories'
const categoryApi = {
    getAll() {
        return axiosClient.get(url)
    },
    getOne(id) {
        return axiosClient.get(`${url}/${id}`)
    },
    create(data) {
        return axiosClient.post(url, data)
    },
    update(id, name) {
        return axiosClient.patch(`${url}/${id}`, name)
    },
    delete(id) {
        return axiosClient.delete(`${url}/${id}`)
    }
}

export default categoryApi
