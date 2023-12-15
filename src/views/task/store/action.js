/* eslint-disable */

// ** import axios
import axios from 'axios'

// ** Create Thunk
import { createAsyncThunk } from "@reduxjs/toolkit"

// ** Third Party Components
import moment from "moment"

export const createNewTask = createAsyncThunk("task/create-new-task", async (event, { getState, rejectWithValue }) => {
    try {
        const user_id = parseInt(event.assignee)
        const postData = {
            task_user_id: user_id,
            title: event.title,
            description: event.description,
            due_date: event.due_date,
            priority: event.priority,
            status: event.status,
            file: event.file,
            created_date: moment().format('YYYY-MM-DD'),
            created_by: getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/task/create_new_task`, postData)
        console.log("CREATE NEW TASK RESPONSE ::: ", response)
        const { status, data } = response
        const { status_code, detail: errorDetail } = data
        if (status === 201 && !status_code) {
            return data
        } else {
            return rejectWithValue(errorDetail)
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
}
)

export const getAllTaskList = createAsyncThunk("task/get-all-task", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/task/get_all_task`, {})
        console.log("GET ALL TASK RESPONSE ::: ", response)
        const { status, data } = response
        if (status === 200) {
            return data.task
        } else {
            return rejectWithValue(errorDetail)
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
}
)

export const updateTask = createAsyncThunk("task/update-task", async (event, { getState, rejectWithValue }) => {
    try {
        const { title, description, assignee, due_date, priority, file } = event.event
        const { task_id } = event
        const updatedData = {
            task_id: task_id,
            task_user_id: parseInt(assignee),
            title: title,
            description: description,
            due_date: due_date,
            priority: priority,
            status: event.event.status,
            file: file[0],
            updated_date: moment().format('YYYY-MM-DD'),
            updated_by: getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/task/update_task`, updatedData)
        console.log("UPDATED TASK RESPONSE ::: ", response)
        const { status, data } = response
        if (status === 200) {
            return data
        } else {
            return rejectWithValue(errorDetail)
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
}
)

export const deleteTask = createAsyncThunk("task/delete-task", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/task/delete_task`, {
            task_id: event.task_id
        })
        console.log("DELETE TASK RESPONSE ::: ", response)
        const { status, data } = response
        if (status === 200) {
            return data
        } else {
            return rejectWithValue(errorDetail)
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
}
)