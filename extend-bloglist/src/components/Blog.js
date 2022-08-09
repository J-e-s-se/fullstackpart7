import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  blogStyle
  return (
    <div className="blog">
      <Link
        to={`/blogs/${blog.id}`}
        className="flex items-center px-4 text-rich-black h-16 shadow my-4 rounded-lg"
      >
        <div className="pr-4">{blog.title}</div>
        <div>{blog.author}</div>
      </Link>
    </div>
  )
}

export default Blog
