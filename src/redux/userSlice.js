import { createSlice } from '@reduxjs/toolkit'

const currentUser =
    sessionStorage.getItem('currentUser') !== null ? JSON.parse(sessionStorage.getItem('currentUser')) : null
const initialState = {
    currentUser: currentUser
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
        }
    }
})

export const { login, logOut } = userSlice.actions
export default userSlice.reducer
