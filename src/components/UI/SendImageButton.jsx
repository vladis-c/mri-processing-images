import React from 'react'

function SendImageButton(props) {
  return (
    <div>
      <button
          onClick={props.sendInfoFucntion}
          disabled={props.imageState ? true : false}
        >
        {props.sendImageMessage}
        </button>
        {!props.imageState && (
          <label> Sending image will activate next steps</label>
        )}
    </div>
  )
}

export default SendImageButton
