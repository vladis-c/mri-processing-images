import React, { Fragment, useState } from "react"
import SkullStrip from "./T1Process/SkullStrip"
import BiasCorrection from "./T1Process/BiasCorrection"
import VoxelBased from "./T1Process/VoxelBased"
import StructuralSegment from "./T1Process/StructuralSegment"
import TensorBased from "./T1Process/TensorBased"
import SendImageButton from "./UI/SendImageButton"
import GetResultButton from "./UI/GetResultButton"

function T1Image(props) {
  const [T1imageInput, setT1ImageInput] = useState(false)
  const [isSkullStrip, setIsSkullStrip] = useState(false)
  const [isBiasCorrection, setIsBiasCorrection] = useState(false)
  const [isVoxelBased, setIsVoxelBased] = useState(false)
  const [isStructuralSegment, setIsStructuralSegment] = useState(false)
  const [isTensorBased, setIsTensorBased] = useState(false)

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
              "Image of T1 is sent",
            ])
          }
          imageState={T1imageInput}
          sendImageMessage={"Send Image of T1"}
        />

        <div>
          <div className="block">
            <button
              onClick={() => {
                sendInfoFucntion(setIsSkullStrip, (oldArray) => [
                  ...oldArray,
                  "Skull Strip information is sent",
                ])
              }}
              disabled={T1imageInput && !isSkullStrip ? false : true}
            >
              <SkullStrip />
            </button>
            <label></label>
            <button
              onClick={() => {
                sendInfoFucntion(setIsBiasCorrection, (oldArray) => [
                  ...oldArray,
                  "Bias Correction information was sent",
                ])
              }}
              disabled={T1imageInput && !isBiasCorrection ? false : true}
            >
              <BiasCorrection />
            </button>
            <label></label>
          </div>
          <div className="block">
            <button
              onClick={() => {
                sendInfoFucntion(setIsVoxelBased, (oldArray) => [
                  ...oldArray,
                  "Voxel-Based Morphometry information was sent",
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
                  "Structural Segmentation information was sent",
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
          </div>
          <div className="block">
            <button
              onClick={() => {
                sendInfoFucntion(setIsTensorBased, (oldArray) => [
                  ...oldArray,
                  "Tensor-based Morphometry information was sent",
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
          </div>
          <GetResultButton
            onClick={() => props.setIsResult(true)}
            stateOfLastElement={isTensorBased}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default T1Image
