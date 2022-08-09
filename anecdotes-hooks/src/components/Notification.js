const Notification = ({notification}) => {
  if (notification)
    return (
      <div>
        {notification}
      </div>
    )
  return null
}

export default Notification