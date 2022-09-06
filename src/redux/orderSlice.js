import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import orderApi from '../api/orderApi'

const getOrdersThunk = createAsyncThunk('category/getAll', async () => {
    try {
        const res = await orderApi.getAll()
        return res
    } catch (err) {
        console.log(err)
    }
})

const canceledOrderThunk = createAsyncThunk('order/canceled', async (id) => {
    try {
        const res = await orderApi.canceled(id)
        return res
    } catch (err) {
        console.log(err)
    }
})

const updateStatusThunk = createAsyncThunk('order/updateStatus', async ({ id, status }) => {
    console.log(id, status)
    try {
        const res = await orderApi.updateStatus(id, status)
        return res
    } catch (err) {
        console.log(err)
    }
})

const initialState = {
    loading: false,
    orders: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: (buider) => {
        buider
            .addCase(getOrdersThunk.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                state.orders = payload
            })
            .addCase(canceledOrderThunk.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(canceledOrderThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                const indexCurrr = state.orders.findIndex((cate) => cate.id === payload.id)
                state.orders[indexCurrr] = payload
            })
            .addCase(updateStatusThunk.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(updateStatusThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                const indexCurrr = state.orders.findIndex((cate) => cate.id === payload.id)
                state.orders[indexCurrr] = payload
            })
    }
})

export { getOrdersThunk, canceledOrderThunk, updateStatusThunk }
export default orderSlice.reducer
