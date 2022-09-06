import { configureStore } from '@reduxjs/toolkit'

import productModalSlice from './productModalSlice'
import cartSlice from './cartSlice'
import userSlice from './userSlice'
import categorySlice from './categorySlice'
import productSlice from './productSlice'
import orderSlice from './orderSlice'

const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cart: cartSlice,
        user: userSlice,
        category: categorySlice,
        product: productSlice,
        order: orderSlice
    }
})

export default store
