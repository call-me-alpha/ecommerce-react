import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import userApi from '../api/userApi'

const getUsersThunk = createAsyncThunk('users/getAll', async () => {
    try {
        const res = await userApi.getAll()
        return res
    } catch (err) {
        console.log(err)
    }
})
const updateRoleThunk = createAsyncThunk('users/updateRole', async ({ id, role }) => {
    try {
        const res = await userApi.updateRole(id, { role })
        return res
    } catch (err) {
        console.log(err)
    }
})

const currentUser =
    sessionStorage.getItem('currentUser') !== null ? JSON.parse(sessionStorage.getItem('currentUser')) : null
const initialState = {
    currentUser: currentUser,
    users: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload
            sessionStorage.setItem('currentUser', JSON.stringify(state.currentUser))
        },
        logOut: (state, action) => {
            state.currentUser = null
            sessionStorage.setItem('currentUser', JSON.stringify(state.currentUser))
        },
        updateRole: (state, { payload }) => {
            const indexCurr = state.users.findIndex((user) => user.id === payload.id)
            state.users[indexCurr] = payload
        }
    },
    extraReducers: (buider) => {
        buider
            .addCase(getUsersThunk.fulfilled, (state, { payload }) => {
                state.users = payload
            })
            .addCase(updateRoleThunk.fulfilled, (state, { payload }) => {
                const indexCurr = state.users.findIndex((user) => user.id === payload.id)
                state.users[indexCurr] = payload
            })
    }
})

export { getUsersThunk, updateRoleThunk }
export const { login, logOut } = userSlice.actions
export default userSlice.reducer
