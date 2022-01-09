import React from "react"

function Card(props) {
  return (
    <div className="grid">
      <button onClick={props.onClick} disabled={props.disabled}>
        {props.text}
      </button>
      <label>{props.label}</label>
    </div>
  )
}

export default Card
