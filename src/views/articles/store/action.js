/* eslint-disable */

// ** import axios
import axios from 'axios'

// ** Create Thunk
import { createAsyncThunk } from "@reduxjs/toolkit"

// ** Third Party Components
import moment from "moment"

export const createNewArticle = createAsyncThunk("article/create-new-article", async (event, { getState, rejectWithValue }) => {
    console.log(event)
    try {
        const postData = {
            "Name": event.articleName,
            "Category_id": event.category,
            "SubCategory_id": event.subCategory,
            "Status": event.status,
            "Created_by": event.userId,
            "Updated_by":event.userId,
            "Updated_date": moment().format('YYYY-MM-DD hh:mm:ss'),
            "Content": event.articleDescription,
            "Attachments":event.Attachments,
            "Article_UUID":event.uuid
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/create-new-article`, postData)
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

export const editUser = createAsyncThunk("user/edit-article", async ({event,article_id}, { getState, rejectWithValue }) => {
    try {
        const postData = {
            // "user_id": event.user_id,
            // "firstName": event.event.firstName,
            // "lastName": event.event.lastName,
            // "email": event.event.emailId,
            // "password": event.event.password,
            // "role_id": role,
            // "updated_date": moment().format('YYYY-MM-DD'),
            // "updated_by": getState().auth.userData.firstName + " " + getState().auth.userData.lastName
            "Name": event.articleName,
            "Category_id": event.category,
            "SubCategory_id": event.subCategory,
            "Status": event.status,
            "Created_by": event.userId,
            "Updated_by":event.userId,
            "Updated_date": moment().format('YYYY-MM-DD hh:mm:ss'),
            "Content": event.articleDescription,
            "Attachments":event.Attachments,
            "Article_UUID":event.uuid
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/editarticle/`+article_id, postData)
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