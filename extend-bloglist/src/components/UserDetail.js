const UserDetail = ({ userDetail }) => {
  if (userDetail) {
    const addedBlogs = userDetail.blogs.map((blog) => {
      return (
        <li className="" key={blog.id}>
          {blog.title}
        </li>
      )
    })
    return (
      <div className="shadow px-6 py-8">
        <h1 className="text-4xl py-4">{userDetail.name}</h1>
        <h3 className="text-2xl py-3">added blogs</h3>
        <ul>{addedBlogs}</ul>
      </div>
    )
  }
  return null
}

export default UserDetail
