// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit"

// ** Custom component Imports
import { showNotifications } from "@components/Notifications"

// ** Actions
import { checkEmailID } from '../../../redux/action'
import { getAllArticles } from '../store/action'

const userDataSlice = createSlice({
    name: "articles",
    initialState: {
        isEmailIDExist: false,
        articlesDataTable: [],
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
            .addCase(getAllArticles.pending, (state) => {
                state.isUserDataLoading = true
            })
            .addCase(getAllArticles.fulfilled, (state, action) => {
                console.log("ACTION ", action)
                state.isUserDataLoading = false
                state.articlesDataTable = action.payload
                state.totalUserDataCount = action.payload.total_count
            })
            .addCase(getAllArticles.rejected, (state, action) => {
                state.isUserDataLoading = false
                state.articlesDataTable = []
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