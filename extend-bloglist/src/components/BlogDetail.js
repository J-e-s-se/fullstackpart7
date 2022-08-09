import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlogComment } from '../reducers/blogs'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

const BlogDetail = ({ blog, likeBlog, removeBlog, blogOwner }) => {
  console.log('blog in blogDetail', blog)
  const dispatch = useDispatch()
  const comment = useField('text')

  const addComment = () => {
    const data = {
      id: blog.id,
      comment: comment.value,
    }
    dispatch(addBlogComment(data))
    comment.reset()
  }

  const getBlogComments = () => {
    return blog.comments.map((comment) => <li key={comment}>{comment}</li>)
  }

  // const blogComment = blog.comments.map((comment) => (
  //   <li key={comment}>{comment}</li>
  // ))

  console.log('blog in BlogDetail', blog)
  if (blog) {
    return (
      <div className="shadow px-6 py-8">
        <h1 className="text-4xl my-2">
          {blog.title} {blog.author}
        </h1>
        <a
          href={`https://${blog.url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {blog.url}
        </a>
        <p>
          {blog.likes} likes{' '}
          <button
            className="bg-blue-700 text-sm px-4 py-2 mt-2 rounded text-white font-bold"
            onClick={likeBlog}
          >
            like
          </button>
        </p>
        <p>added by {blog.user.name}</p>
        <h3 className="text-2xl py-3">comments</h3>
        <input {...comment} className="mr-2" reset="reset" />
        <button
          className="bg-blue-700 text-sm px-4 py-2 mt-2 rounded text-white font-bold"
          onClick={addComment}
          disabled={comment.value ? false : true}
        >
          add comment
        </button>
        <ul className="my-8">{getBlogComments()}</ul>
        {blogOwner && (
          <button
            className="bg-red-500 text-sm px-4 mt-2 py-2 rounded text-white font-bold"
            onClick={removeBlog}
          >
            remove
          </button>
        )}
      </div>
    )
  }
  return null
}

export default BlogDetail
