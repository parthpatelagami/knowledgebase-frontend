/* eslint-disable */

// ** import axios
import axios from 'axios'

// ** Create Thunk
import { createAsyncThunk } from "@reduxjs/toolkit"

// ** Third Party Components
import moment from "moment"

export const createNewTeam = createAsyncThunk("team/create-new-team", async (event, { getState, rejectWithValue }) => {
    try {
        const { team_name, team_managers, team_members } = event
        const postData = {
            team_name: team_name,
            team_members: team_members,
            team_managers: team_managers,
            created_date: moment().format('YYYY-MM-DD'),
            created_by: getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/team/create_new_team`, postData)
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

export const getAllTeam = createAsyncThunk("team/get-all-team", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/team/get_all_team`, {})
        const { status, data } = response
        if (status === 200) {
            return data.Team
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

export const editTeam = createAsyncThunk("team/edit-team", async (event, { getState, rejectWithValue }) => {
    try {
        const { team_name, team_managers, team_members } = event.formData
        const postData = {
            team_id: event.team_id,
            team_name: team_name,
            team_members: team_members,
            team_managers: team_managers,
            updated_date: moment().format('YYYY-MM-DD'),
            updated_by: getState().auth.userData.firstName + " " + getState().auth.userData.lastName
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/team/edit_team`, postData)
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

export const deleteTeam = createAsyncThunk("team/delete-team", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/team/delete_team`, {
            team_id: event.team_id
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