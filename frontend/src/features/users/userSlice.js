import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://34.95.127.87';

const initialState = {
    user: {},
    loading: false,
    error: '',
    isLoggedIn: false,
}

export const loginAdminUser = createAsyncThunk('userSlice/loginAdminUser', data => {
    return axios.post(`${url}/login/admin`, data)
        .then(res => res.data)
})

export const loginUser = createAsyncThunk('userSlice/loginUser', data => {
    return axios.post(`${url}/login`, data)
        .then(res => res.data)
})

export const registerUser = createAsyncThunk('userSlice/registerUser', data => {
    return axios.post(`${url}/users`, data)
        .then(res => res.data)
})

export const getUser = createAsyncThunk('userSlice/getUser', user_id => {
    return axios.get(`${url}/users/${user_id}`)
        .then(res => res.data)
})

export const getUserAdmin = createAsyncThunk('userSlice/getUserAdmin', id => {
    return axios.get(`${url}/admins/${id}`)
        .then(res => res.data)
})

export const createAccount = createAsyncThunk('userSlice/createAccount', data => {
    return axios.post(`${url}/accounts`, data)
        .then(res => res.data)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: state => {
            state.loading = false
            state.user = {}
            state.isLoggedIn = false
            state.error = ''
            sessionStorage.clear()
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, state => {
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isLoggedIn = true
            state.error = ''
            sessionStorage.setItem('user_id', JSON.stringify(action.payload.id))
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.isLoggedIn = false
            state.error = action.error.message
        })


        builder.addCase(loginAdminUser.pending, state => {
            state.loading = true
        })
        builder.addCase(loginAdminUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isLoggedIn = true
            state.error = ''
            sessionStorage.setItem('user_id', JSON.stringify(action.payload.id))
        })
        builder.addCase(loginAdminUser.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.isLoggedIn = false
            state.error = action.error.message
        })


        builder.addCase(registerUser.pending, state => {
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoggedIn = false
            state.error = ''
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.isLoggedIn = false
            state.error = action.error.message
        })


        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isLoggedIn = true
            state.error = ''
        })


        builder.addCase(getUserAdmin.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isLoggedIn = true
            state.error = ''
        })


        builder.addCase(createAccount.pending, state => {
            state.loading = true
        })
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false
            state.isLoggedIn = true
            sessionStorage.setItem('user_id', JSON.stringify(action.payload.user.id))
            state.user = action.payload.user
            window.location.reload()
        })

        builder.addCase(createAccount.rejected, (state, action) => {
            state.loading = false
            state.isLoggedIn = false
            state.error = action.error.message
        })

    }
})

export const { logout } = userSlice.actions

export default userSlice.reducer