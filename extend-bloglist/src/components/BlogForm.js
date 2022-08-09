import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2 className="text-3xl">create new</h2>
      <form onSubmit={addBlog}>
        <div className="relative h-20 mt-2">
          title:
          <input
            type="text"
            id="titleinput"
            data-testid="titleinput"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
            className="absolute bottom-0 left-0 w-full rounded h-[50px] shadow"
          />
        </div>
        <div className="relative h-20 mt-2">
          author:
          <input
            type="text"
            id="authorinput"
            data-testid="authorinput"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
            className="absolute bottom-0 left-0 w-full rounded h-[50px] shadow"
          />
        </div>
        <div className="relative h-20 mt-2">
          url:
          <input
            type="text"
            id="urlinput"
            data-testid="urlinput"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
            className="absolute bottom-0 left-0 w-full rounded h-[50px] shadow"
          />
        </div>
        <button
          id="createbutton"
          className="bg-blue-700 text-sm px-4 py-2 mt-2 rounded text-white font-bold"
        >
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
