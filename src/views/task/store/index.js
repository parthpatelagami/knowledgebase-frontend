// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit"

// ** Custom component Imports
import { showNotifications } from "@components/Notifications"

// ** Actions
import { getAllTaskList } from '../store/action'

const taskDataSlice = createSlice({
    name: "task",
    initialState: {
        isTaskDataLoading: false,
        taskDataTable: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTaskList.pending, (state) => {
                state.isTaskDataLoading = true
            })
            .addCase(getAllTaskList.fulfilled, (state, action) => {
                state.isTaskDataLoading = false
                state.taskDataTable = action.payload
            })
            .addCase(getAllTaskList.rejected, (state, action) => {
                state.isTaskDataLoading = false
                state.taskDataTable = []
                console.log(
                    "An error occured while fetching task data: ",
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

export default taskDataSlice.reducer