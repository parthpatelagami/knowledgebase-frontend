// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit"

// ** Custom component Imports
import { showNotifications } from "@components/Notifications"

// ** Actions
import { checkEmailID } from '../../../redux/action'
import { getAllUsers } from '../store/action'

const userDataSlice = createSlice({
    name: "users",
    initialState: {
        isEmailIDExist: false,
        userDataTable: [],
        isUserDataLoading: false,
        totalUserDataCount: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkEmailID.fulfilled, (state, action) => {
                state.isEmailIDExist = action.payload
            })
            .addCase(checkEmailID.rejected, (state, action) => {
                state.isEmailIDExist = false
                console.log(
                    "An error occured while checking email id :",
                    action.payload
                )
                showNotifications({
                    type: "error",
                    title: "Oops! Something went wrong!",
                    message: "We cannot check email id, please contact support team.."
                })
            })
            // ** FOR FETCHING LIST OF SCORE CARD DATA
            .addCase(getAllUsers.pending, (state) => {
                state.isUserDataLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isUserDataLoading = false
                state.userDataTable = action.payload
                state.totalUserDataCount = action.payload.total_count
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isUserDataLoading = false
                state.userDataTable = []
                state.totalUserDataCount = 0
                console.log(
                    "An error occured while fetching user data: ",
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