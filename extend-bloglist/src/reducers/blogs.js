import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setNotification } from './notification'
import axios from 'axios'

const BLOGS_URL = '/api/blogs'
const LOGIN_URL = '/api/login'

const getConfig = (token) => {
  const auth = `bearer ${token}`

  return {
    headers: { Authorization: auth },
  }
}

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axios.get(BLOGS_URL)
  return response.data
})

export const addBlog = createAsyncThunk(
  'blogs/addblog',
  async (data, { getState }) => {
    const state = getState()
    const config = getConfig(selectToken(state))
    const response = await axios.post(BLOGS_URL, data, config)
    return response.data
  }
)

export const likeBlog = createAsyncThunk(
  'blogs/likeBlog',
  async (id, { getState }) => {
    const state = getState()
    const config = getConfig(selectToken(state))
    console.log(config)
    const blog = selectBlogById(state, id)
    const blogUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }

    const response = await axios.put(
      `${BLOGS_URL}/${blogUpdate.id}`,
      blogUpdate,
      config
    )

    response.data.user = blog.user
    return response.data
  }
)

export const login = createAsyncThunk(
  'blogs/login',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(LOGIN_URL, credentials)
      return response.data
    } catch (err) {
      if (!err.response) {
        throw err
      }
      console.log('setting notification')
      dispatch(
        setNotification({ message: err.response.data.error, status: 'bad' })
      )
      setTimeout(() => {
        dispatch(setNotification({ message: null, status: null }))
      }, 5000)
      return rejectWithValue(err.response.data)
    }
  }
)

export const addBlogComment = createAsyncThunk(
  'blogs/addBlogComment',
  async ({ id, comment }) => {
    const data = { comment }
    const url = `${BLOGS_URL}/${id}/comments`
    const response = await axios.post(url, data)
    return response.data
  }
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id, { getState }) => {
    const state = getState()
    const config = getConfig(selectToken(state))
    await axios.delete(`${BLOGS_URL}/${id}`, config)
    return id
  }
)

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    status: 'idle',
    addBlogStatus: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    user: {},
  },

  reducers: {
    setUser(state) {
      const loggedinuser = window.localStorage.getItem('loggedinuser')
      if (loggedinuser) {
        const userdata = JSON.parse(loggedinuser)
        state.user = userdata
      }
    },

    logout(state) {
      window.localStorage.removeItem('loggedinuser')
      state.user = {}
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = action.payload
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(addBlog.pending, (state) => {
        state.addBlogStatus = 'loading'
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.addBlogStatus = 'succeeded'
        state.blogs.push(action.payload)
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.addBlogStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(likeBlog.pending, (state) => {
        state.likeBlogStatus = 'loading'
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const { id } = action.payload
        state.likeBlogStatus = 'succeeded'
        state.blogs = state.blogs
          .filter((blog) => blog.id !== id)
          .concat(action.payload)
      })
      .addCase(likeBlog.rejected, (state, action) => {
        state.likeBlogStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(deleteBlog.pending, (state) => {
        state.deleteBlogStatus = 'loading'
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const id = action.payload
        state.deleteBlogStatus = 'succeeded'
        state.blogs = state.blogs.filter((blog) => blog.id !== id)
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.deleteBlogStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded'
        window.localStorage.setItem(
          'loggedinuser',
          JSON.stringify(action.payload)
        )
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'failed'
        state.error = action.payload.error
      })

      .addCase(addBlogComment.pending, (state) => {
        state.addBlogCommentStatus = 'loading'
      })
      .addCase(addBlogComment.fulfilled, (state, action) => {
        state.addBlogCommentStatus = 'succeeded'
        const { id } = action.payload
        state.blogs = state.blogs
          .filter((blog) => blog.id !== id)
          .concat(action.payload)
      })
      .addCase(addBlogComment.rejected, (state, action) => {
        state.addBlogCommentStatus = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectBlogs = (state) => state.blog.blogs

export const selectBlogById = (state, id) => {
  console.log('id ', id)
  console.log('state by id', state)
  return state.blog.blogs.find((blog) => blog.id === id)
}

export const selectUser = (state) => state.blog.user

export const selectToken = (state) => state.blog.user.token

export const selectLoginError = (state) => state.blog.loginError

export const logState = (state) => console.log('state: ', state)

export const { setUser, logout } = blogSlice.actions

export default blogSlice.reducer
