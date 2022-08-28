import axiosClient from './axiosClient'

const userApi = {
    resgister(data) {
        const url = 'users'
        return axiosClient.post(url, data)
    }
}

export default userApi
