import {useNavigate} from 'react-router-dom'
import {useField} from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`a new anecdote ${content.value} created!`)
    setTimeout(() => props.setNotification(''), 5000)
    navigate('/')
  }

  const reset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <InputField attr={content} />
        </div>
        <div>
          author
          <InputField attr={author} />
        </div>
        <div>
          url for more info
          <InputField attr={info} />
        </div>
        <button>create</button>
        <button onClick={reset} type="button">reset</button>
      </form>
    </div>
  )

}

const InputField = ({attr}) => {
  return (
    <input {...attr} reset=''/>
  )
}

export default CreateNew