import axiosClient from './axiosClient'

const url = 'orders'
const orderApi = {
    getAll() {
        return axiosClient.get(url)
    },
    getOne(id) {
        return axiosClient.get(`${url}/${id}`)
    },
    create(data) {
        return axiosClient.post(url, data)
    },
    canceled(id) {
        return axiosClient.patch(`${url}/${id}`, { status: 'canceled' })
    },
    updateStatus(id, status) {
        return axiosClient.patch(`${url}/${id}`, { status })
    }
}

export default orderApi
