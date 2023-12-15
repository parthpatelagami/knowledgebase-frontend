// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Actions
import {
    fetchDashboardHeaderData,
} from './action'

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        isDashboardHeaderDataloading: false,
        dashboardHeaderData: {},
        isDashboardHasError: false
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchDashboardHeaderData.pending, (state) => {
                state.isDashboardHeaderDataloading = true
            })
            .addCase(fetchDashboardHeaderData.fulfilled, (state, action) => {
                state.isDashboardHeaderDataloading = false
                state.dashboardHeaderData = { ...action.payload }
            })
            .addCase(fetchDashboardHeaderData.rejected, (state, action) => {
                console.log("An error occured in fetch dashboard header data: ", action.payload)
                state.isDashboardHeaderDataloading = false
                state.isDashboardHasError = true
                state.dashboardHeaderData = {}
            })
    }
})


export default dashboardSlice.reducer