import React, { Fragment, useState } from "react"
import Card from "./Card/Card"
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

function T1AndFlair(props) {
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
          <div className="block">
            <Card
              onClick={() => {
                sendInfoFucntion(setIsSkullStrip, (oldArray) => [
                  ...oldArray,
                  <SkullStrip />,
                ])
              }}
              disabled={imageInput && !isSkullStrip ? false : true}
              text={<SkullStrip />}
            />

            <Card
              onClick={() => {
                sendInfoFucntion(setIsBiasCorrection, (oldArray) => [
                  ...oldArray,
                  <BiasCorrection />,
                ])
              }}
              disabled={imageInput && !isBiasCorrection ? false : true}
              text={<BiasCorrection />}
            />

            <Card
              onClick={() => {
                sendInfoFucntion(setIsGradientAnalysis, (oldArray) => [
                  ...oldArray,
                  <GradientAnalysis />,
                ])
              }}
              disabled={imageInput && !isGradientAnalysis ? false : true}
              text={<GradientAnalysis />}
            />

            <Card
              onClick={() => {
                sendInfoFucntion(setIsIntensityNorm, (oldArray) => [
                  ...oldArray,
                  <IntensityNorm />,
                ])
              }}
              disabled={imageInput && !isIntensityNorm ? false : true}
              text={<IntensityNorm />}
            />
          </div>
          <div className="block">
            <Card
              onClick={() => {
                sendInfoFucntion(setIsVoxelBased, (oldArray) => [
                  ...oldArray,
                  <VoxelBased />,
                ])
              }}
              disabled={isSkullStrip && !isVoxelBased ? false : true}
              text={<VoxelBased />}
              label={
                isSkullStrip
                  ? ""
                  : "To send data of Voxel-based Morphometry, please, send data of Skull-Strip"
              }
            />
            <Card
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
              text={<StructuralSegment />}
              label={
                isBiasCorrection && isSkullStrip
                  ? ""
                  : "To send data of Structural Segmentation, please, send data of Skull-Strip and Bias Correction"
              }
            />
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
                  : "To send data of Lesion Segmentation, please, send data of Gradient Analysis and Intensity Normalisation"
              }
            />
          </div>
          <div className="block">
            <Card
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
              text={<TensorBased />}
              label={
                isVoxelBased && isStructuralSegment
                  ? ""
                  : "To send data of Tensor-based Morphometry, please, send data of Voxel-based morphometry and Structural Segmentation"
              }
            />
            <p>{/* Dummy paragraph for styling purposes*/}</p>
            <Card
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
              text={<CoRegistration />}
              label={
                isLesionSegmentation && isStructuralSegment
                  ? ""
                  : "To send data of Co-Registration, please, send data of Structural Segmentation and Lesion Segmentation"
              }
            />
          </div>
          <div className="block">
            <p>{/* Dummy paragraph for styling purposes*/}</p>
            <p>{/* Dummy paragraph for styling purposes*/}</p>
            <Card
              onClick={() => {
                sendInfoFucntion(setIsHyperintensity, (oldArray) => [
                  ...oldArray,
                  <Hyperintensity />,
                ])
              }}
              disabled={!isHyperintensity && isCoRegistration ? false : true}
              text={<Hyperintensity />}
              label={
                isCoRegistration
                  ? ""
                  : " To send data of Hyperintensity, please, send data of Co-Registration"
              }
            />
          </div>
          <div>
            <GetResultButton
              onClick={() => props.setIsResult(true)}
              disabled={imageInput}
              label={
                "The configuration is available after sending the images"
              }
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default T1AndFlair
