import { configureStore } from '@reduxjs/toolkit'

import productModalSlice from './productModalSlice'
import cartSlice from './cartSlice'
import userSlice from './userSlice'
import categorySlice from './categorySlice'

const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cart: cartSlice,
        user: userSlice,
        category: categorySlice
    }
})

export default store
