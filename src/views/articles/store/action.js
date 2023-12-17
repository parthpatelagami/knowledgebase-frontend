/* eslint-disable */

// ** import axios
import axios from 'axios'

// ** Create Thunk
import { createAsyncThunk } from "@reduxjs/toolkit"

// ** Third Party Components
import moment from "moment"

export const createNewArticle = createAsyncThunk("user/create-new-user", async (event, { getState, rejectWithValue }) => {
    try {
        const role = parseInt(event.role)
        const postData = {
            "firstName": event.firstName,
            "lastName": event.lastName,
            "email": event.emailId,
            "password": event.password,
            "role_id": role,
            "created_date": moment().format('YYYY-MM-DD'),
            "created_by": getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/add_new_user`, postData)
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

export const getAllArticles = createAsyncThunk("article/getallarticle", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/getallarticle`, {})
        console.log("GET ALL Article RESPONSE ::: ", response)
        const { status, data } = response
        if (status === 200) {
            return data.articles
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

export const editUser = createAsyncThunk("user/edit-user", async (event, { getState, rejectWithValue }) => {
    try {
        const role = parseInt(event.event.role)
        const postData = {
            "user_id": event.user_id,
            "firstName": event.event.firstName,
            "lastName": event.event.lastName,
            "email": event.event.emailId,
            "password": event.event.password,
            "role_id": role,
            "updated_date": moment().format('YYYY-MM-DD'),
            "updated_by": getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/edit_users`, postData)
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

export const deleteArticle = createAsyncThunk("articles/delete-articles", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/deletearticle/${event.ID}`)

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

export const suspendUser = createAsyncThunk("user/suspend-users", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/suspend_users`, {
            user_id: event.user_id
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