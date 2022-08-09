import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import { setNotification, selectNotification } from './reducers/notification'
import {
  selectBlogs,
  selectUser,
  addBlog,
  likeBlog,
  deleteBlog,
  login,
  logout,
} from './reducers/blogs'

import { selectUsers } from './reducers/users'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import Users from './components/Users'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import Header from './components/Header'
import './App.css'

const Main = ({ handleCreate, sortedBlogs }) => {
  return (
    <div className="p-6">
      <Togglable buttonLabel="new blog">
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

const App = () => {
  const userById = (id) => blogusers.find((a) => a.id === id)
  const blogById = (id) => blogs.find((a) => a.id === id)

  const blogusers = useSelector(selectUsers)
  const match = useMatch('/users/:id')
  const userDetail = match ? userById(match.params.id) : null

  const blogs = useSelector(selectBlogs)
  const blogmatch = useMatch('/blogs/:id')
  const blogDetail = blogmatch ? blogById(blogmatch.params.id) : null
  const user = useSelector(selectUser)
  console.log('user in App', user)
  console.log('blogDetail in App', blogDetail)
  const blogObject = useSelector((state) => state.blog)
  blogObject
  console.log(blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector(selectNotification)
  console.log('notification in App', notification)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in...')

    const credentials = { username, password }
    dispatch(login(credentials))

    setUsername('')
    setPassword('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  const handleCreate = async (createdata) => {
    dispatch(addBlog(createdata))
    dispatch(
      setNotification({
        message: `a new blog ${createdata.title} by ${createdata.author} added`,
        status: 'good',
      })
    )
    setTimeout(() => {
      dispatch(setNotification({ message: null, status: null }))
    }, 5000)
  }

  const handleBlogLike = async (id) => {
    dispatch(likeBlog(id))
  }

  const handleBlogDelete = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    dispatch(deleteBlog(id))
  }

  return (
    <div className="font-roboto container mx-auto">
      {Object.keys(user).length !== 0 ? (
        <div>
          <Header
            user={user}
            handleLogout={handleLogout}
            notification={notification}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main handleCreate={handleCreate} sortedBlogs={sortedBlogs} />
              }
            />
            <Route path="/users" element={<Users />} />
            <Route
              path="/users/:id"
              element={<UserDetail userDetail={userDetail} />}
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogDetail
                  blog={blogDetail}
                  blogOwner={
                    user ? user.username === blogDetail?.user.username : false
                  }
                  likeBlog={() => handleBlogLike(blogDetail.id)}
                  removeBlog={() => handleBlogDelete(blogDetail.id)}
                />
              }
            />
          </Routes>
        </div>
      ) : (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            notification={notification}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            Notification={Notification}
          />
        </Togglable>
      )}
    </div>
  )
}

export default App
