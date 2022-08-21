import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = 'http://localhost:8000'

const getProducts = createAsyncThunk('products/getProducts', async () => {
    try {
        const res = await axios.get(`${URL}/products`)
        const data = await res.data
        return data
    } catch (err) {
        console.log(err)
    }
})

export { getProducts }