import PropTypes from 'prop-types'
const LoginForm = ({
  handleLogin,
  notification,
  username,
  password,
  setUsername,
  setPassword,
  Notification,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-3xl font-bold">Login to the application</h2>
      <Notification notification={notification} />
      <div className="relative h-20 mt-2">
        username
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="absolute bottom-0 left-0 w-full max-w-[20rem] rounded h-[50px] shadow"
        />
      </div>
      <div className="relative h-20 mt-2">
        password
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="absolute bottom-0 left-0 w-full max-w-[20rem] rounded h-[50px] shadow"
        />
      </div>
      <button
        className="bg-blue-700 text-sm px-4 py-2 mt-2 rounded text-white font-bold"
        id="login-button"
        type="submit"
      >
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  notification: PropTypes.object.isRequired,
  Notification: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginForm
