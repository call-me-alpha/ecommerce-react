import { configureStore } from '@reduxjs/toolkit'
import filtersSlice from './filtersSlice'

import productSlice from './productsSlice'
const store = configureStore({
    reducer: {
        products: productSlice,
        filters: filtersSlice
    }
})

export default store
