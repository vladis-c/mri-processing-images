import React, { Fragment, useState } from "react"
import SkullStrip from "./T1Process/SkullStrip"
import BiasCorrection from "./T1Process/BiasCorrection"
import VoxelBased from "./T1Process/VoxelBased"
import StructuralSegment from "./T1Process/StructuralSegment"
import TensorBased from "./T1Process/TensorBased"
import SendImageButton from "./UI/SendImageButton"
import GetResultButton from "./UI/GetResultButton"
import Card from "./Card/Card"
import { T1 } from "../util/util"

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
              `Image of ${T1}`,
            ])
          }
          imageState={T1imageInput}
          sendImageMessage={`Send Image of ${T1}`}
        />
        <div>
          <div className="grid">
            <Card
              onClick={() => {
                sendInfoFucntion(setIsSkullStrip, (oldArray) => [
                  ...oldArray,
                  <SkullStrip />,
                ])
              }}
              disabled={T1imageInput && !isSkullStrip ? false : true}
              text={<SkullStrip />}
            />

            <Card
              onClick={() => {
                sendInfoFucntion(setIsBiasCorrection, (oldArray) => [
                  ...oldArray,
                  <BiasCorrection />,
                ])
              }}
              disabled={T1imageInput && !isBiasCorrection ? false : true}
              text={<BiasCorrection />}
            />
          </div>
          <div className="grid">
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
                  : " To send data of Voxel-based Morphometry, please, send data of Skull-Strip"
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
                  : " To send data of Structural Segmentation, please, send data of Skull-Strip and Bias Correction"
              }
            />
          </div>
          <div className="grid">
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
                  : " To send data of Tensor-based Morphometry, please, send data of both Voxel-based morphometry and Structural Segmentation"
              }
            />
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
