import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './store'
import { fetchBlogs, setUser } from './reducers/blogs'
import { fetchUsers } from './reducers/users'

store.dispatch(fetchBlogs())
store.dispatch(setUser())
store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
