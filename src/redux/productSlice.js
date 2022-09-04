import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import productApi from '../api/productApi'

const getProductsThunk = createAsyncThunk('product/getAll', async () => {
    try {
        const res = await productApi.getAll()
        return res
    } catch (err) {
        console.log(err)
    }
})
const deleteProdThunk = createAsyncThunk('product/delete', async (id) => {
    try {
        await productApi.delete(id)
        return id
    } catch (err) {
        console.log(err)
    }
})
const createProdThunk = createAsyncThunk('product/create', async (data) => {
    try {
        const res = await productApi.create(data)
        return res
    } catch (err) {
        console.log(err)
    }
})

const updateProdThunk = createAsyncThunk('product/update', async ({ id, data }) => {
    try {
        const res = await productApi.update(id, data)
        return res
    } catch (err) {
        console.log(err)
    }
})

const initialState = {
    loading: false,
    products: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (buider) => {
        buider
            .addCase(getProductsThunk.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getProductsThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                state.products = payload
            })
            .addCase(deleteProdThunk.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(deleteProdThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                state.products = state.products.filter((cate) => cate.id !== payload)
            })
            .addCase(createProdThunk.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(createProdThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                state.products.push(payload)
            })
            .addCase(updateProdThunk.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(updateProdThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                const indexCurrr = state.products.findIndex((cate) => cate.id === payload.id)
                state.products[indexCurrr] = payload
            })
    }
})

export { getProductsThunk, deleteProdThunk, createProdThunk, updateProdThunk }
export default productSlice.reducer
