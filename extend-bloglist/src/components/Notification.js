const Notification = ({ notification }) => {
  let { message, status } = notification
  if (!message) {
    return null
  }
  console.log(`message: ${message}, status: ${status}`)
  console.log(`message === null ${message === null}`)
  return (
    <div
      className={`notification ${status} border-1 absolute -bottom-14 right-2.5`}
    >
      {message}
    </div>
  )
}

export default Notification
