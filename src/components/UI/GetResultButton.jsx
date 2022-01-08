import React from 'react'

function GetResultButton(props) {
  return (
    <div>
      <button
            onClick={props.onClick}
            disabled={props.stateOfLastElement ? false : true}
          >
            GET RESULT
          </button>
    </div>
  )
}

export default GetResultButton
