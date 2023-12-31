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
            // "SubCategory_id": event.subCategory,
            "Status": event.status,
            "Created_by": event.userId,
            "Updated_by":event.userId,
            "Updated_date": moment().format('YYYY-MM-DD hh:mm:ss'),
            "Content": event.content,
            "Attachments":event.Attachments,
            "Article_UUID":event.uuid,
            "Category_Name":event.categoryName
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

export const getAllArticles = createAsyncThunk("article/get_all_article", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/getallarticle`, {})
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

export const editUser = createAsyncThunk("user/edit-article", async ({event,article_id,preeditedcontent}, { getState, rejectWithValue }) => {
    try {
        const htmlContent=event.articleDescription!=null && event.articleDescription!="" ? event.articleDescription : preeditedcontent
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
            "Content": event.content,
            "Attachments":event.Attachments,
            "Article_UUID":event.uuid,
            "Category_Name":event.categoryName
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

export const deleteArticleAttachement = createAsyncThunk("article/delete-attachements", async (event, { getState, rejectWithValue }) => {
    try {
        const postData = {
            "fileName": event.fileName,
            "uuid":event.uuid
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/delete-attachements`, postData)
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
export const tranferFileOnEdit = createAsyncThunk("article/tranfer-attachements", async ({ArticleID,UUID}, { getState, rejectWithValue }) => {
    try {
        const postData = {
            "id": ArticleID,
            "uuid":UUID
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/tranferfileOnEdit`, postData)
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

export const searchArticle = createAsyncThunk("articles/searcharticle", async (event, { getState, rejectWithValue }) => {
    
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/seracharticle/${event}`)
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

export const getCategoryWiseArticleData = createAsyncThunk("articles/getcategorydata", async (event, { getState, rejectWithValue }) => {
    
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/getallcategorydata`)   
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

export const getArticlesData = createAsyncThunk("articles/getarticlesdata", async (event, { getState, rejectWithValue }) => {
   
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/article/getarticlesdata/${event}`)
        const { status, data } = response
        if (status === 200) {
            return data.articlesdata
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