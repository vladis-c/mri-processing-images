
import React from "react"

function Result(props) {
  
  return (
    <div className="result">
      <h1>
        This is the sequence of {props.heading} image information received
      </h1>
      {props.renderedTitles}
    </div>
  )
}

export default Result
