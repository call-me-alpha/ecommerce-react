import { createSlice } from '@reduxjs/toolkit'

import { getAllProductServer } from './apiProduct'

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        products: [],
        error: false
    },
    reducers: {},
    extraReducers: (buider) => {
        buider
            .addCase(getAllProductServer.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getAllProductServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.products = action.payload
            })
    }
})

export default productsSlice.reducer
