// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit"

// ** Custom component Imports
import { showNotifications } from "@components/Notifications"

// ** Actions
import { getAllRoles } from '../../../../redux/action'

const roleDataSlice = createSlice({
    name: "permissions",
    initialState: {
        roleDataTable: [],
        isRoleDataLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ** FOR FETCHING LIST OF ROLE DATA
            .addCase(getAllRoles.pending, (state) => {
                state.isRoleDataLoading = true
            })
            .addCase(getAllRoles.fulfilled, (state, action) => {
                state.isRoleDataLoading = false
                state.roleDataTable = [...action.payload.role]   
            })
            .addCase(getAllRoles.rejected, (state, action) => {
                state.isRoleDataLoading = false
                state.roleDataTable = []
                console.log(
                    "An error occured while fetching role data: ",
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

export default roleDataSlice.reducer