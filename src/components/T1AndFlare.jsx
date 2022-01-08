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

  function sendInfoFucntion(prop1, prop2) {
    props.switchStateHandler(prop1)
    props.setResultArray(prop2)
  }

  return (
    <Fragment>
      <div>
        <SendImageButton
          sendInfoFucntion={() =>
            sendInfoFucntion(setT1ImageInput, (oldArray) => [
              ...oldArray,
              `Images of ${T1FLAIR}`,
            ])
          }
          imageState={imageInput}
          sendImageMessage={`Send Images of ${T1FLAIR}`}
        />
        <div>
          <div className="grid">
            <button
              onClick={() => {
                sendInfoFucntion(setIsSkullStrip, (oldArray) => [
                  ...oldArray,
                  <SkullStrip />,
                ])
              }}
              disabled={imageInput && !isSkullStrip ? false : true}
            >
              <SkullStrip />
            </button>
            <label></label>
            <button
              onClick={() => {
                sendInfoFucntion(setIsBiasCorrection, (oldArray) => [
                  ...oldArray,
                  <BiasCorrection />,
                ])
              }}
              disabled={imageInput && !isBiasCorrection ? false : true}
            >
              <BiasCorrection />
            </button>
            <label></label>
            <button
              onClick={() => {
                sendInfoFucntion(setIsGradientAnalysis, (oldArray) => [
                  ...oldArray,
                  <GradientAnalysis />,
                ])
              }}
              disabled={imageInput && !isGradientAnalysis ? false : true}
            >
              <GradientAnalysis />
            </button>
            <label></label>
            <button
              onClick={() => {
                sendInfoFucntion(setIsIntensityNorm, (oldArray) => [
                  ...oldArray,
                  <IntensityNorm />,
                ])
              }}
              disabled={imageInput && !isIntensityNorm ? false : true}
            >
              <IntensityNorm />
            </button>
            <label></label>
          </div>
          <div className="grid">
            <button
              onClick={() => {
                sendInfoFucntion(setIsVoxelBased, (oldArray) => [
                  ...oldArray,
                  <VoxelBased />,
                ])
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
                sendInfoFucntion(setIsStructuralSegment, (oldArray) => [
                  ...oldArray,
                  <StructuralSegment />,
                ])
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
                sendInfoFucntion(setIsTensorBased, (oldArray) => [
                  ...oldArray,
                  <TensorBased />,
                ])
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
                sendInfoFucntion(setIsCoRegistration, (oldArray) => [
                  ...oldArray,
                  <CoRegistration />,
                ])
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
                sendInfoFucntion(setIsHyperintensity, (oldArray) => [
                  ...oldArray,
                  <Hyperintensity />,
                ])
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
      </div>
    </Fragment>
  )
}

export default T1AndFlare
