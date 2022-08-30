import axiosClient from './axiosClient'

const userApi = {
    register(data) {
        const url = 'users'
        return axiosClient.post(url, data)
    },
    getAll() {
        const url = 'users'
        return axiosClient.get(url)
    },
    getOne(id) {
        const url = 'users'
        return axiosClient.get(`${url}/${id}`)
    }
}

export default userApi
