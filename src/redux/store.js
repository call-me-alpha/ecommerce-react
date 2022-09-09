import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import productModalSlice from './productModalSlice'
import cartSlice from './cartSlice'
import userSlice from './userSlice'
import categorySlice from './categorySlice'
import productSlice from './productSlice'
import orderSlice from './orderSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({
    productModal: productModalSlice,
    cart: cartSlice,
    user: userSlice,
    category: categorySlice,
    product: productSlice,
    order: orderSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

let persistor = persistStore(store)

export { store, persistor }
