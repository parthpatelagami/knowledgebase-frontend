/* eslint-disable */

// ** import axios
import axios from 'axios'

// ** Create Thunk
import { createAsyncThunk } from "@reduxjs/toolkit"

// ** Third Party Components
import moment from "moment"

export const createNewSubCategory = createAsyncThunk("subcategory/create-new-subcategory", async (event, { getState, rejectWithValue }) => {
    console.log(event)
    try {
        const postData = {
            "category_id": event.event.category_id,
            "subcategory_name": event.event.subCategory,
            "description": event.event.description,
            "status": event.isSwitchOn,
            "created_date": moment().format('YYYY-MM-DD'),
            "created_by": getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/subcategory/create_new_subcategory`, postData)
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

export const getAllSubCategory = createAsyncThunk("subcategory/get-all-subcategory", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/subcategory/get_all_subcategory`, {})
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

export const editSubCategory = createAsyncThunk("subcategory/edit-subcategory", async (event, { getState, rejectWithValue }) => {
    console.log(event)
    try {
        const postData = {
            "subcategory_id": event.subcategory_id,
            "subcategory_name": event.event.subCategory,
            "description": event.event.description,
            "status": event.event.status,
            "updated_date": moment().format('YYYY-MM-DD'),
            "updated_by": getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/subcategory/update_all_subcategory`, postData)
        const { status, data } = response
        const { status_code, detail: errorDetail } = data
        if (status === 200 && !status_code) {
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

export const deleteSubCategory = createAsyncThunk("user/delete-subcategory", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/subcategory/delete_all_subcategory`, {
            subcategory_id: event.subcategory_id
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