import { createSlice } from '@reduxjs/toolkit'

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    value: items
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, { payload }) => {
            const { id, size, color, quantity } = payload
            if (state.value.length <= 0) {
                state.value.push(payload)
            } else {
                let check = state.value.find((item) => item.id === id && item.color === color && item.size === size)
                if (check) {
                    console.log('sản phẩm đã tồn tại')
                    state.value.forEach((item, index) => {
                        if (item.id === id) {
                            let updateItem = {
                                ...item,
                                quantity: item.quantity + quantity
                            }
                            state.value[index] = updateItem
                        }
                    })
                } else {
                    state.value.push(payload)
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value))
        },
        updateQuantityDown: (state, { payload }) => {
            const { id, size, color } = payload
            let check = state.value.find((item) => item.id === id && item.color === color && item.size === size)
            if (check.quantity === 1) {
                state.value.forEach((item, index) => {
                    if (item.id === id && item.color === color && item.size === size) {
                        state.value.splice(index, 1)
                    }
                })
            } else {
                state.value.forEach((item, index) => {
                    if (item.id === id && item.color === color && item.size === size) {
                        let updateItem = {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        state.value[index] = updateItem
                    }
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value))
        },
        updateQuantityUp: (state, { payload }) => {
            const { id, size, color } = payload
            state.value.forEach((item, index) => {
                if (item.id === id && item.color === color && item.size === size) {
                    let updateItem = {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    state.value[index] = updateItem
                }
            })
            localStorage.setItem('cartItems', JSON.stringify(state.value))
        },
        removeItem: (state, { payload }) => {
            state.value.forEach((item, index) => {
                if (item.id === payload.id) {
                    state.value.splice(index, 1)
                }
            })
            localStorage.setItem('cartItems', JSON.stringify(state.value))
        }
    }
})

export const { addItem, removeItem, updateQuantityDown, updateQuantityUp } = cartSlice.actions
export default cartSlice.reducer
