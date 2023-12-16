/* eslint-disable */

// ** import axios
import axios from "axios";

// ** Create Thunk
import { createAsyncThunk } from "@reduxjs/toolkit";

// ** Third Party Components
import moment from "moment";

export const createNewCategory = createAsyncThunk(
  "category/add-new-category",
  async (event, { getState, rejectWithValue }) => {
    try {
      const role = parseInt(event.role);
      const postData = {
        name: event.name,
        description: event.description,
        status: event.status,
        created_date: moment().format("YYYY-MM-DD"),
        created_by: getState().auth.userData.id,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/category/add_new_category`,
        postData
      );
      const { status, data } = response;
      const { status_code, detail: errorDetail } = data;
      if (status === 201 && !status_code) {
        return data;
      } else {
        return rejectWithValue(errorDetail);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllCategory = createAsyncThunk(
  "category/get_all_category",
  async (event, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/category/get_all_category`,
        {}
      );
      console.log("GET ALL CATEGORY RESPONSE ::: ", response);
      const { status, data } = response;
      if (status === 200) {
        return data.category;
      } else {
        return rejectWithValue(errorDetail);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/edit-category",
  async (event, { getState, rejectWithValue }) => {
    try {
      const postData = {
        category_id: event.category_id,
        name: event.event.name,
        description: event.event.description,
        status: event.event.status,
        updated_date: moment().format("YYYY-MM-DD"),
        updated_by: getState().auth.userData.id,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/category/edit_category`,
        postData
      );
      const { status, data } = response;
      const { status_code, detail: errorDetail } = data;
      if (status === 200 && !status_code) {
        return data;
      } else {
        return rejectWithValue(errorDetail);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete-category",
  async (event, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/category/delete_category`,
        {
          category_id: event.category_id,
        }
      );

      const { status, data } = response;
      if (status === 200) {
        return data.category;
      } else {
        return rejectWithValue(errorDetail);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
