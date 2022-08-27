import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import productApi from '../api/productApi'

const initialState = {
    products: []
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (buider) => {
        buider.addCase(getProdutcsServer.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }
})

const getProdutcsServer = createAsyncThunk('products/getProducts', async () => {
    try {
        const res = await productApi.getAll()
        return res
    } catch (err) {
        console.log(err)
    }
})

export { getProdutcsServer }

export default productSlice.reducer
