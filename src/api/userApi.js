import axiosClient from './axiosClient'

const userApi = {
    register(data) {
        const url = 'users'
        return axiosClient.post(url, data)
    },
    getOne(id) {
        const url = 'users'
        return axiosClient.get(`${url}/${id}`)
    }
}

export default userApi
