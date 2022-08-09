import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const USERS_URL = '/api/users'
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL)
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    status: 'idle', // idle, loading, succeeded, failed
    users: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading'
    })

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.users = action.payload
    })

    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'failed'
    })
  },
})

export const selectUsers = (state) => state.user.users

export default usersSlice.reducer
