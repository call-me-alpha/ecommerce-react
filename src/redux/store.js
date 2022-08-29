import { configureStore } from '@reduxjs/toolkit'

import productModalSlice from './productModalSlice'
import cartSlice from './cartSlice'
import userSlice from './userSlice'

const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cart: cartSlice,
        user: userSlice
    }
})

export default store
