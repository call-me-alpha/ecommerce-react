import { createSlice } from '@reduxjs/toolkit'

import { getProducts } from './apiProduct'

const productSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        products: [],
        error: false
    },
    reducers: {},
    extraReducers: (buider) => {
        buider.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload
        })
    }
})

export default productSlice.reducer
