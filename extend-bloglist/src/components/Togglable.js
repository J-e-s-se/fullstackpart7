import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="shadow px-6 py-8">
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className="bg-white hover:bg-sky-100 text-sm font-bold text-dodger-blue border border-solid border-dodger-blue px-6 py-2 rounded-lg"
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className="bg-red-500 text-sm px-4 mt-2 py-2 rounded text-white font-bold"
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
