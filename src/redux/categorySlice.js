import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import categoryApi from '../api/categoryApi'

const getCategoriesThunk = createAsyncThunk('category/getAll', async () => {
    try {
        const res = await categoryApi.getAll()
        return res
    } catch (err) {
        console.log(err)
    }
})
const deleteCateThunk = createAsyncThunk('category/delete', async (id) => {
    try {
        await categoryApi.delete(id)
        return id
    } catch (err) {
        console.log(err)
    }
})
const createCateThunk = createAsyncThunk('category/create', async (data) => {
    try {
        const res = await categoryApi.create(data)
        return res
    } catch (err) {
        console.log(err)
    }
})

const updateCateThunk = createAsyncThunk('category/update', async (data) => {
    const { id, name } = data
    try {
        const res = await categoryApi.update(id, { name: name })
        return res
    } catch (err) {
        console.log(err)
    }
})

const initialState = {
    categories: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (buider) => {
        buider
            .addCase(getCategoriesThunk.fulfilled, (state, { payload }) => {
                state.categories = payload
            })
            .addCase(deleteCateThunk.fulfilled, (state, { payload }) => {
                state.categories = state.categories.filter((cate) => cate.id !== payload)
            })
            .addCase(createCateThunk.fulfilled, (state, { payload }) => {
                state.categories.push(payload)
            })
            .addCase(updateCateThunk.fulfilled, (state, { payload }) => {
                const indexCurrr = state.categories.findIndex((cate) => cate.id === payload.id)
                state.categories[indexCurrr] = payload
            })
    }
})

export { getCategoriesThunk, deleteCateThunk, createCateThunk, updateCateThunk }
export default categorySlice.reducer
