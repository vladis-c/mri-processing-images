import React from "react"

function GetResultButton(props) {
  return (
    <div className="button">
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
