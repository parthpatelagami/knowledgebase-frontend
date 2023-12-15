/* eslint-disable */

// ** import axios
import axios from 'axios'

// ** Create Thunk
import { createAsyncThunk } from "@reduxjs/toolkit"

// ** Third Party Components
import moment from "moment"
import { showNotifications } from '@components/Notifications'

export const createNewRole = createAsyncThunk("role/create-new-role", async (event, { getState, rejectWithValue }) => {
    try {
        const permissionArray = []
        for (const key in event) {
            if (key !== "oldRole" && key !== "newRole") {
                permissionArray.push({
                    page: key,
                    permission: event[key]
                })
            }
        }
        const postData = {
            role_name: event.newRole,
            permissions: permissionArray,
            created_date: moment().format('YYYY-MM-DD'),
            created_by: getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/role/create_new_role`, postData)
        const { status, data } = response
        const { status_code, detail: errorDetail } = data
        if (status === 201 && !status_code) {
            return data
        } else if (status === 400) {
            showNotifications({
                type: 'error',
                title: 'Not Found!',
                message: `The server cannot or will not process the request due to something that is perceived to be a client error.`
            })
        } else if (status == 500) {
            showNotifications({
                type: 'error',
                title: 'Opps. Something went wrong!',
                message: `Internal server error.`
            })
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

export const editRole = createAsyncThunk("role/edit-role", async (event, { getState, rejectWithValue }) => {
    try {
        const { newRole } = event.event
        const permissionArray = []
        for (const key in event.event) {
            if (key !== "oldRole" && key !== "newRole") {
                permissionArray.push({
                    page: key,
                    permission: event.event[key]
                })
            }
        }
        const postData = {
            role_id: event.role_id,
            role_name: newRole,
            permissions: permissionArray,
            updated_date: moment().format('YYYY-MM-DD'),
            updated_by: getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/role/edit_role`, postData)
        const { status, data } = response
        const { status_code, detail: errorDetail } = data
        if (status === 200 && !status_code) {
            return data
        } else if (status === 400) {
            showNotifications({
                type: 'error',
                title: 'Not Found!',
                message: `The server cannot or will not process the request due to something that is perceived to be a client error.`
            })
        } else if (status == 500) {
            showNotifications({
                type: 'error',
                title: 'Opps. Something went wrong!',
                message: `Internal server error.`
            })
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

export const deleteRole = createAsyncThunk("role/delete-role", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/role/delete_role`, {
            role_name: event
        })
        const { status, data } = response
        if (status === 200) {
            return data.users
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

export const checkRoleByName = createAsyncThunk("role/check-role-by-name", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/role/check_role_by_name`, {
            role_name: event
        })
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