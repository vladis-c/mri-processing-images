import React, { useState, Fragment } from "react"
import GradientAnalysis from "./FlairProcess/GradientAnalysis"
import IntensityNorm from "./FlairProcess/IntensityNorm"
import LesionSegment from "./FlairProcess/LesionSegment"
import GetResultButton from "./UI/GetResultButton"
import SendImageButton from "./UI/SendImageButton"
import { FLAIR } from "../util/util"
import axios from "axios"


function FlairImage(props) {
  const [flairImageInput, setFlairImageInput] = useState(false)
  const [isGradientAnalysis, setIsGradientAnalysis] = useState(false)
  const [isIntensityNorm, setIsIntensityNorm] = useState(false)
  const [isLesionSegmentation, setIsLesionSegmentation] = useState(false)

  async function postHadler(prop) {
    await axios
      .post(`http://localhost:4001/flair`, {
        title: prop,
      })
      .catch((err) => console.log(err))
  }

  return (
    <Fragment>
      <SendImageButton
        sendInfoFucntion={() => {
          props.switchStateHandler(setFlairImageInput)
          postHadler(`Images of ${FLAIR}`)
        }}
        imageState={flairImageInput}
        sendImageMessage={`Send Image of ${FLAIR}`}
      />
      <div className="block">
        <button
          onClick={() => {
            props.switchStateHandler(setIsGradientAnalysis)
            postHadler("Gradient Analysis")
          }}
          disabled={flairImageInput && !isGradientAnalysis ? false : true}
        >
          <GradientAnalysis />
        </button>
        <label></label>
        <button
          onClick={() => {
            props.switchStateHandler(setIsIntensityNorm)
            postHadler("Intensity Normality")
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
            props.switchStateHandler(setIsLesionSegmentation)
            postHadler("Lesion Segmentation")
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
