import { Link } from 'react-router-dom'
import Notification from './Notification'

const Header = ({ user, handleLogout, notification }) => {
  // const Header = ({ user, handleLogout }) => {
  return (
    <div className="container h-20 px-6 mx-auto flex justify-between items-center drop-shadow bg-white relative">
      <Link to="/">
        <h2 className="text-dodger-blue text-4xl">Blog App</h2>
      </Link>
      <Link
        to="/"
        className="text-rich-black font-bold hover:text-dodger-blue text-xl"
      >
        Blogs{' '}
      </Link>
      <Link
        to="/users"
        className="text-rich-black font-bold hover:text-dodger-blue text-xl"
      >
        Users{' '}
      </Link>
      <p className="text-dodger-blue">{user.name} logged in</p>
      <button
        className="bg-yale-blue hover:opacity-95 text-xl font-bold text-white px-5 py-2 rounded-full"
        onClick={handleLogout}
      >
        Logout
      </button>
      <Notification notification={notification} />
    </div>
  )
}

export default Header
