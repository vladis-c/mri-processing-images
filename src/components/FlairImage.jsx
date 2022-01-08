import React, { useState, Fragment } from "react"
import GradientAnalysis from "./FlairProcess/GradientAnalysis"
import IntensityNorm from "./FlairProcess/IntensityNorm"
import LesionSegment from "./FlairProcess/LesionSegment"
import GetResultButton from "./UI/GetResultButton"
import SendImageButton from "./UI/SendImageButton"

function FlairImage(props) {
  const [flairImageInput, setFlairImageInput] = useState(false)
  const [isGradientAnalysis, setIsGradientAnalysis] = useState(false)
  const [isIntensityNorm, setIsIntensityNorm] = useState(false)
  const [isLesionSegmentation, setIsLesionSegmentation] = useState(false)

  function sendInfoFucntion(prop1, prop2) {
    props.switchStateHandler(prop1)
    props.setResultArray(prop2)
  }

  return (
    <Fragment>
      <SendImageButton
        sendInfoFucntion={() => {
          sendInfoFucntion(setFlairImageInput, (oldArray) => [
            ...oldArray,
            "Image of Flair is sent",
          ])
        }}
        imageState={flairImageInput}
        sendImageMessage={"Send Image of Flair"}
      />
      <div className="block">
        <button
          onClick={() => {
            sendInfoFucntion(setIsGradientAnalysis, (oldArray) => [
              ...oldArray,
              "Gradient Analysis information is sent",
            ])
          }}
          disabled={flairImageInput && !isGradientAnalysis ? false : true}
        >
          <GradientAnalysis />
        </button>
        <label></label>
        <button
          onClick={() => {
            sendInfoFucntion(setIsIntensityNorm, (oldArray) => [
              ...oldArray,
              "Intensity Normalisation information was sent",
            ])
          }}
          disabled={flairImageInput && !isIntensityNorm ? false : true}
        >
          <IntensityNorm />
        </button>
        <label></label>
      </div>
      <div className="block">
        <button
          onClick={() => {
            sendInfoFucntion(setIsLesionSegmentation, (oldArray) => [
              ...oldArray,
              "Lesion Segmentation information was sent",
            ])
          }}
          disabled={
            isGradientAnalysis && isIntensityNorm && !isLesionSegmentation
              ? false
              : true
          }
        >
          <LesionSegment />
        </button>
        <label>
          {isGradientAnalysis && isIntensityNorm
            ? ""
            : " To send data of Lesion Segmentation, please, send data of both Gradient Analysis and Intensity Normalisation"}
        </label>
      </div>
      <GetResultButton
        onClick={() => props.setIsResult(true)}
        stateOfLastElement={isLesionSegmentation}
      />
    </Fragment>
  )
}

export default FlairImage
