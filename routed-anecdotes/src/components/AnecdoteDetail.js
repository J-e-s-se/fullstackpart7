const AnecdoteDetail = ({anecdote}) => {
  return anecdote ? (  
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  ): <div></div>
}

export default AnecdoteDetail