// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit"

// ** Custom component Imports
import { showNotifications } from "@components/Notifications"

// ** Actions
import { getAllTeam } from '../store/action'

const teamDataSlice = createSlice({
    name: "team",
    initialState: {
        isTeamDataLoading: false,
        teamDataTable: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTeam.pending, (state) => {
                state.isTeamDataLoading = true
            })
            .addCase(getAllTeam.fulfilled, (state, action) => {
                state.isTeamDataLoading = false
                state.teamDataTable = action.payload
            })
            .addCase(getAllTeam.rejected, (state, action) => {
                state.isTeamDataLoading = false
                state.teamDataTable = []
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

export default teamDataSlice.reducer