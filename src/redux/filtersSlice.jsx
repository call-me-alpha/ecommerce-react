import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        isLoading: false,
        filters: {
            tags: [],
            search: '',
            cateId: null,
            price: null
        }
    },
    reducers: {
        filtersTags: (state, action) => {
            state.tags = action.payload
        }
    }
})

export const { filtersTags } = filtersSlice.actions
export default filtersSlice.reducer
