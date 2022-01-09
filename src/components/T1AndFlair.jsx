import React, { Fragment, useState } from "react"
import SkullStrip from "./T1Process/SkullStrip"
import BiasCorrection from "./T1Process/BiasCorrection"
import VoxelBased from "./T1Process/VoxelBased"
import StructuralSegment from "./T1Process/StructuralSegment"
import TensorBased from "./T1Process/TensorBased"
import SendImageButton from "./UI/SendImageButton"
import GetResultButton from "./UI/GetResultButton"
import GradientAnalysis from "./FlairProcess/GradientAnalysis"
import IntensityNorm from "./FlairProcess/IntensityNorm"
import LesionSegment from "./FlairProcess/LesionSegment"
import CoRegistration from "./CommonProcess/CoRegistration"
import Hyperintensity from "./CommonProcess/Hyperintensity"
import { T1FLAIR } from "../util/util"
import axios from "axios"

function T1AndFlare(props) {
  const [imageInput, setT1ImageInput] = useState(false)
  const [isSkullStrip, setIsSkullStrip] = useState(false)
  const [isBiasCorrection, setIsBiasCorrection] = useState(false)
  const [isVoxelBased, setIsVoxelBased] = useState(false)
  const [isStructuralSegment, setIsStructuralSegment] = useState(false)
  const [isTensorBased, setIsTensorBased] = useState(false)

  const [isGradientAnalysis, setIsGradientAnalysis] = useState(false)
  const [isIntensityNorm, setIsIntensityNorm] = useState(false)
  const [isLesionSegmentation, setIsLesionSegmentation] = useState(false)

  const [isCoRegistration, setIsCoRegistration] = useState(false)
  const [isHyperintensity, setIsHyperintensity] = useState(false)

  async function postHadler(prop) {
    await axios
      .post(`http://localhost:4002/T1flair`, {
        title: prop,
      })
      .catch((err) => console.log(err))
  }

  return (
    <Fragment>
      <SendImageButton
        sendInfoFucntion={() => {
          props.switchStateHandler(setT1ImageInput)
          postHadler(`Images of ${T1FLAIR}`)
        }}
        imageState={imageInput}
        sendImageMessage={`Send Images of ${T1FLAIR}`}
      />
      <div>
        <div className="grid">
          <button
            onClick={() => {
              props.switchStateHandler(setIsSkullStrip)
              postHadler("Skull Strip")
            }}
            disabled={imageInput && !isSkullStrip ? false : true}
          >
            <SkullStrip />
          </button>
          <label id="1"></label>
          <button
            onClick={() => {
              props.switchStateHandler(setIsBiasCorrection)
              postHadler("Bias Correction")
            }}
            disabled={imageInput && !isBiasCorrection ? false : true}
          >
            <BiasCorrection />
          </button>
          <label id="2"></label>
          <button
            onClick={() => {
              props.switchStateHandler(setIsGradientAnalysis)
              postHadler("Gradient Analysis")
            }}
            disabled={imageInput && !isGradientAnalysis ? false : true}
          >
            <GradientAnalysis />
          </button>
          <label id="3"></label>
          <button
            onClick={() => {
              props.switchStateHandler(setIsIntensityNorm)
              postHadler("Intensity Normality")
            }}
            disabled={imageInput && !isIntensityNorm ? false : true}
          >
            <IntensityNorm />
          </button>
          <label id="4"></label>
        </div>
        <div className="grid">
          <button
            onClick={() => {
              props.switchStateHandler(setIsVoxelBased)
              postHadler("Voxel-based morphometry")
            }}
            disabled={isSkullStrip && !isVoxelBased ? false : true}
          >
            <VoxelBased />
          </button>
          <label>
            {isSkullStrip
              ? ""
              : " To send data of Voxel-based Morphometry, please, send data of Skull-Strip"}
          </label>
          <button
            onClick={() => {
              props.switchStateHandler(setIsStructuralSegment)
              postHadler("Structural Segmentation")
            }}
            disabled={
              isSkullStrip && isBiasCorrection && !isStructuralSegment
                ? false
                : true
            }
          >
            <StructuralSegment />
          </button>
          <label>
            {isBiasCorrection && isSkullStrip
              ? ""
              : " To send data of Structural Segmentation, please, send data of Skull-Strip and Bias Correction"}
          </label>
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
        <div className="block">
          <button
            onClick={() => {
              props.switchStateHandler(setIsTensorBased)
              postHadler("Tensor-based morphometry")
            }}
            disabled={
              isVoxelBased && isStructuralSegment && !isTensorBased
                ? false
                : true
            }
          >
            <TensorBased />
          </button>
          <label>
            {isVoxelBased && isStructuralSegment
              ? ""
              : " To send data of Tensor-based Morphometry, please, send data of both Voxel-based morphometry and Structural Segmentation"}
          </label>

          <button
            onClick={() => {
              props.switchStateHandler(setIsCoRegistration)
              postHadler("Co-registration")
            }}
            disabled={
              isStructuralSegment && isLesionSegmentation && !isCoRegistration
                ? false
                : true
            }
          >
            <CoRegistration />
          </button>
          <label>
            {isLesionSegmentation && isStructuralSegment
              ? ""
              : " To send data of Co-Registration, please, send data of both Structural Segmentation (from T1 Image) and Lesion Segmentation (from Flair Image)"}
          </label>
        </div>
        <div className="block">
          <label id="5"></label>
          <button
            onClick={() => {
              props.switchStateHandler(setIsHyperintensity)
              postHadler("Hyperintensity")
            }}
            disabled={!isHyperintensity && isCoRegistration ? false : true}
          >
            <Hyperintensity />
          </button>
          <label>
            {isCoRegistration
              ? ""
              : " To send data of Hyperintensity, please, send data of Co-Registration"}
          </label>
        </div>
        <GetResultButton
          onClick={() => props.setIsResult(true)}
          stateOfLastElement={isTensorBased && isHyperintensity}
        />
      </div>
    </Fragment>
  )
}

export default T1AndFlare
