import React from "react"

function GetResultButton(props) {
  return (
    <div className="button">
      <button
        onClick={props.onClick}
        disabled={props.disabled ? false : true}
      >
        GET RESULT
      </button>
      <label>{props.label}</label>
    </div>
  )
}

export default GetResultButton
