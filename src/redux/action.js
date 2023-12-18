// ** import axios
import axios from "axios";

// ** Create Thunk
import { createAsyncThunk } from "@reduxjs/toolkit";

// ** Third Party Components
import moment from "moment";

// FUNCTION TO CHECK EMAILID EXISTS OR NOT
export const checkEmailID = createAsyncThunk(
  "users/check-email",
  async (event, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/check_email`,
        {
          email: event,
        }
      );
      console.log("EMAIL RESPONSE ::: ", response);
      const { status, data } = response;
      if (status === 200) {
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

// FUNCTION TO GET THE LIST OF ROLE DATA
export const getAllRoles = createAsyncThunk(
  "users/check-role",
  async (event, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/check_role`,
        {}
      );
      console.log("ROLE RESPONSE ::: ", response);
      const { status, data } = response;
      if (status === 200) {
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

// FUNCTION TO GET LIST OF USER BY EMPLOYEE ID
export const getUserByEmployeeId = createAsyncThunk(
  "team/get-user-by-employee-id",
  async (event, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/team/get_user_by_employee`,
        {}
      );
      console.log("GET USER BY EMPLOYEE ID RESPONSE ::: ", response);
      const { status, data } = response;
      if (status === 200) {
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

// FUNCTION TO GET LIST OF USER BY MANAGER ID
export const getUserByManagerId = createAsyncThunk(
  "team/get-user-by-manager-id",
  async (event, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/team/get_user_by_manager`,
        {}
      );
      console.log("GET USER BY MANAGER ID RESPONSE ::: ", response);
      const { status, data } = response;
      if (status === 200) {
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

// FUNCTION TO GET LIST OF USER BY EMPLOYEE ID
export const getAllUsers = createAsyncThunk(
  "team/get-user-by-employee-id",
  async (event, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/team/get_all_users`,
        {}
      );
      console.log("GET ALL USER RESPONSE ::: ", response);
      const { status, data } = response;
      if (status === 200) {
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

// FUNCTION TO CHECK IN USER AFTER LOGIN
export const checkInUser = createAsyncThunk(
  "user/checkin-users",
  async (event, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/checkin_users`,
        {
          user_id: event.user_id,
          login_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        }
      );

      const { status, data } = response;
      if (status === 200) {
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

// FUNCTION TO CHECK OUT USER AFTER LOGIN
export const checkOutUser = createAsyncThunk(
  "user/checkout-users",
  async (event, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/checkout_users`,
        {
          user_id: event.user_id,
          logout_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        }
      );

      const { status, data } = response;
      if (status === 200) {
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

// FUNCTION TO CHECK OUT USER AFTER LOGIN
export const getUserStatus = createAsyncThunk(
  "user/users-status",
  async (event, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/get_users_status`,
        {
          user_id: event.user_id,
        }
      );

      const { status, data } = response;
      if (status === 200) {
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
)

export const getAllCategory = createAsyncThunk("task/get-all-task", async (event, { getState, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/category/get_all_category`, {})
        const { status, data } = response

        if (status === 200) {
            return data.category
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

export const checkCategory = createAsyncThunk(
  "category/check_category",
  async (event, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/category/check_category`,
        event
      );
      const { status, data } = response;
      if (status === 200) {
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

