import React from "react"

function Result(props) {
  return (
    <div>
      <h1>This Is Result of {props.heading}</h1>
      {props.resultData}
    </div>
  )
}

export default Result
