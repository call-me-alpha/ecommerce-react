import { configureStore } from '@reduxjs/toolkit'

import productModalSlice from './productModalSlice'
import cartSlice from './cartSlice'

const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cart: cartSlice
    }
})

export default store
