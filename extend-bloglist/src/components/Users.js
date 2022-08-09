import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUsers } from '../reducers/users'

const Users = () => {
  const users = useSelector(selectUsers)
  const usersTable = users.map((user) => {
    return (
      <tr key={user.id}>
        <td className="py-4 px-8">
          <Link to={`./${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })
  console.log(users)
  return (
    <div className="shadow px-6 py-8">
      <h2 className="text-3xl">Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {usersTable}
        </tbody>
      </table>
    </div>
  )
}

export default Users
