import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import blogReducer from './reducers/blogs'
import userReducer from './reducers/users'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
  },
})
