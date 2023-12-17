// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit"

// ** Custom component Imports
import { showNotifications } from "@components/Notifications"

// ** Actions
import { getAllSubCategory } from '../store/action'

const userDataSlice = createSlice({
    name: "subcategory",
    initialState: {
        subcategoryDataTable: [],
        issubcategoryDataLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubCategory.pending, (state) => {
                state.issubcategoryDataLoading = true
            })
            .addCase(getAllSubCategory.fulfilled, (state, action) => {
                console.log(action)
                state.issubcategoryDataLoading = false
                state.subcategoryDataTable = action.payload
            })
            .addCase(getAllSubCategory.rejected, (state, action) => {
                state.issubcategoryDataLoading = false
                state.subcategoryDataTable = []
                console.log(
                    "An error occured while fetching subcategory data: ",
                    action.payload
                )
                showNotifications({
                    type: "error",
                    title: "Oops! Something went wrong!",
                    message: "Please contact support team."
                })
            })
    }
})

export default userDataSlice.reducer