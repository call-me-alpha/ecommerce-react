import { configureStore } from '@reduxjs/toolkit'

import productModalSlice from './productModalSlice'
import productSlice from './productSlice'
import cartSlice from './cartSlice'

const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cart: cartSlice,
        products: productSlice
    }
})

export default store
