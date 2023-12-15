// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showNotifications } from '@components/Notifications'

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from "moment"

const MySwal = withReactContent(Swal)

// ** Construct require ability for ACL
const constructACLAbility = (permissions) => {
  const ability = []
  permissions.forEach(element => {
    const key = Object.keys(element)[0]
    const value = element[key]
    switch (value) {
      case 'Editor':
        ability.push({ action: "edit", subject: key })
        ability.push({ action: "view", subject: key })
        break
      case 'Viewer':
        ability.push({ action: "view", subject: key })
        break
      default:
    }
  })
  // return ability
  return [{ action: 'manage', subject: 'all' }]
}

export const handleLogin = createAsyncThunk('auth/login', async (event, { rejectWithValue }) => {
  try {
    const { email, given_name, family_name, hd, picture, name } = event

    // Check if the email ends with '@agami-tech.com'
    if (!email.endsWith('@agami-tech.com')) {
      showNotifications({
        type: "error",
        title: `Invalid Login`,
        message: `User can only login using organization provided accounts.`
      })
      return rejectWithValue(data)
    }

    const response = await useJwt.login({
      email,
      firstName: given_name,
      lastName: family_name,
      profile: picture,
      companyName: hd,
      created_date: moment().format('YYYY-MM-DD'),
      created_by: given_name + " " + family_name
    })
    console.log("LOGIN RESPONSE ::: ", response)

    const { status, data } = response

    const { firstName, lastName, profile, permissions, role, created_date, created_by, user_id } = data
    let userData = {}
    if (status === 200) {
      if (data.isSuspended === 'Y') {
        showNotifications({
          type: "warning",
          title: `Sorry! Unauthorized User.`,
          message: `This is to inform that you don't have permission to login.!`
        })
        return rejectWithValue(data)
      } else {
        userData = {
          email,
          role,
          firstName,
          lastName,
          profile,
          ability: constructACLAbility(permissions),
          created_date,
          created_by,
          user_id
        }
        showNotifications({
          type: "success",
          title: `Welcome! ${name}`,
          message: `You have successfully logged in.`
        })
        return userData
      }

    } else if (status === 201) {
      userData = {
        email,
        role,
        firstName,
        lastName,
        profile,
        ability: constructACLAbility(permissions),
        created_date,
        created_by,
        user_id
      }
      MySwal.fire({
        title: `Welcome ${firstName}!`,
        text: 'Thanks for joining us.!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      return userData
    } else if (response.showAlert) {
      return showNotifications({
        type: "error",
        title: `Invalid Login`,
        message: `User can only login using organistion provided accounts.!.`
      })
    } else {
      return rejectWithValue(data)
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})

const initialUser = () => {
  try {
    const item = window.localStorage.getItem('userData')
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error("Error retrieving data from localStorage:", error)
    return {}
  }
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    loading: false,
    userData: initialUser(),
    email: ''
  },
  reducers: {
    handleLogout: state => {
      state.userData = {}
      window.localStorage.clear()
    }
  },
  extraReducers: builder => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false
        state.userData = action.payload
        localStorage.setItem('userData', JSON.stringify(action.payload))
      })
      .addCase(handleLogin.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { handleLogout } = authSlice.actions

export default authSlice.reducer
