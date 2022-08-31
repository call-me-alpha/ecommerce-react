import axiosClient from './axiosClient'
const url = 'users'
const userApi = {
    register(data) {
        return axiosClient.post(url, data)
    },
    getAll() {
        return axiosClient.get(url)
    },
    getOne(id) {
        return axiosClient.get(`${url}/${id}`)
    },
    updateRole(id, data) {
        return axiosClient.patch(`${url}/${id}`, data)
    }
}

export default userApi
