import React, { Fragment, useState } from "react"
import SkullStrip from "./T1Process/SkullStrip"
import BiasCorrection from "./T1Process/BiasCorrection"
import VoxelBased from "./T1Process/VoxelBased"
import StructuralSegment from "./T1Process/StructuralSegment"
import TensorBased from "./T1Process/TensorBased"
import SendImageButton from "./UI/SendImageButton"
import GetResultButton from "./UI/GetResultButton"
import { T1 } from "../util/util"
import axios from "axios"

function T1Image(props) {
  const [T1imageInput, setT1ImageInput] = useState(false)
  const [isSkullStrip, setIsSkullStrip] = useState(false)
  const [isBiasCorrection, setIsBiasCorrection] = useState(false)
  const [isVoxelBased, setIsVoxelBased] = useState(false)
  const [isStructuralSegment, setIsStructuralSegment] = useState(false)
  const [isTensorBased, setIsTensorBased] = useState(false)  

  async function postHadler(prop) {
    await axios
      .post(`http://localhost:4000/T1`, {
        title: prop,
      })
      .catch((err) => console.log(err))
  }

  return (
    <Fragment>
      <div>
      <SendImageButton
          sendInfoFucntion={() => {
            props.switchStateHandler(setT1ImageInput)
            postHadler(`Images of ${T1}`)
          }}
          imageState={T1imageInput}
          sendImageMessage={`Send Images of ${T1}`}
        />
        <div>
          <div className="block">
            <button
              onClick={() => {
                props.switchStateHandler(setIsSkullStrip)
                postHadler("Skull Strip")
              }}
              disabled={T1imageInput && !isSkullStrip ? false : true}
            >
              <SkullStrip />
            </button>
            <label></label>
            <button
             onClick={() => {
              props.switchStateHandler(setIsBiasCorrection)
              postHadler("Bias Correction")
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
