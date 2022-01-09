import React, { useState, Fragment } from "react"
import GradientAnalysis from "./FlairProcess/GradientAnalysis"
import IntensityNorm from "./FlairProcess/IntensityNorm"
import LesionSegment from "./FlairProcess/LesionSegment"
import GetResultButton from "./UI/GetResultButton"
import SendImageButton from "./UI/SendImageButton"
import Card from "./Card/Card"
import { FLAIR } from "../util/util"

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
            `Image of ${FLAIR}`,
          ])
        }}
        imageState={flairImageInput}
        sendImageMessage={`Send Image of ${FLAIR}`}
      />
      <div className="grid">
        <Card
          onClick={() => {
            sendInfoFucntion(setIsGradientAnalysis, (oldArray) => [
              ...oldArray,
              <GradientAnalysis />,
            ])
          }}
          disabled={flairImageInput && !isGradientAnalysis ? false : true}
          text={<GradientAnalysis />}
        />

        <Card
          onClick={() => {
            sendInfoFucntion(setIsIntensityNorm, (oldArray) => [
              ...oldArray,
              <IntensityNorm />,
            ])
          }}
          disabled={flairImageInput && !isIntensityNorm ? false : true}
          text={<IntensityNorm />}
        />
      </div>
      <div className="grid">
        <Card
          onClick={() => {
            sendInfoFucntion(setIsLesionSegmentation, (oldArray) => [
              ...oldArray,
              <LesionSegment />,
            ])
          }}
          disabled={
            isGradientAnalysis && isIntensityNorm && !isLesionSegmentation
              ? false
              : true
          }
          text={<LesionSegment />}
          label={
            isGradientAnalysis && isIntensityNorm
              ? ""
              : `To send data of Lesion Segmentation, please, send data of Gradient Analysis and Intensity Normalisation`
          }
        />
      </div>
      <GetResultButton
        onClick={() => props.setIsResult(true)}
        disabled={flairImageInput}
        label={
          "The configuration is available after sending the image"
        }
      />
    </Fragment>
  )
}

export default FlairImage
