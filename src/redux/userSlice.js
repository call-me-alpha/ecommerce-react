import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from '../api/userApi'

const initialState = {
    loading: false,
    currentUser: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (buider) => {}
})

const login = createAsyncThunk('users/login', async () => {
    try {
        const res = userApi.login()
    } catch {}
})
