import axios from 'axios'

const { REACT_APP_API_URL } = process.env

const axiosClient = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default axiosClient
