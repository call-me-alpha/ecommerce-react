import { configureStore } from '@reduxjs/toolkit'

import productModalSlice from './productModalSlice'

const store = configureStore({
    reducer: {
        productModal: productModalSlice
    }
})

export default store
