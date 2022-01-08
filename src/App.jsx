import React, { Fragment, useState } from "react"
import T1Image from "./components/T1Image"
import FlairImage from "./components/FlairImage"
import Result from "./components/Result"
import T1AndFlare from "./components/T1AndFlare"
import { FLAIR, switchStateHandler, T1, T1FLAIR } from "./util/util"

function App() {
  const [resultArray, setResultArray] = useState([])
  const [isResult, setIsResult] = useState(false)
  const [choice, setChoice] = useState({})

  const resultData = resultArray.map((el, key) => <p key={key}>{el}</p>)

  return (
    <Fragment>
      <div style={{ margin: "10px" }}>THIS IS MRI APP</div>
      <div style={{ margin: "10px" }}>
        <button
          onClick={() => {
            setChoice({ value: 1, heading: T1 })
            setResultArray([])
            setIsResult(false)
          }}
        >
          {T1}
        </button>
        <button
          onClick={() => {
            setChoice({ value: 2, heading: FLAIR })
            setResultArray([])
            setIsResult(false)
          }}
        >
          {FLAIR}
        </button>
        <button
          onClick={() => {
            setChoice({ value: 3, heading: T1FLAIR })
            setResultArray([])
            setIsResult(false)
          }}
        >
          {T1FLAIR}
        </button>
      </div>
      {choice.value === 1 && (
        <div>
          {!isResult ? (
            <div>
              <h2 style={{ margin: "10px" }}>{choice.heading} INPUT IMAGE</h2>
              <T1Image
                setResultArray={setResultArray}
                setIsResult={setIsResult}
                switchStateHandler={switchStateHandler}
              ></T1Image>
            </div>
          ) : (
            <Result resultData={resultData} heading={choice.heading} />
          )}
        </div>
      )}
      {choice.value === 2 && (
        <div>
          {!isResult ? (
            <div>
              <h2 style={{ margin: "10px" }}>{choice.heading} INPUT IMAGE</h2>
              <FlairImage
                setResultArray={setResultArray}
                setIsResult={setIsResult}
                switchStateHandler={switchStateHandler}
              ></FlairImage>
            </div>
          ) : (
            <Result resultData={resultData} heading={choice.heading} />
          )}
        </div>
      )}
      {choice.value === 3 && (
        <div>
          {!isResult ? (
            <div>
              <h2 style={{ margin: "10px" }}>{choice.heading} INPUT IMAGES</h2>
              <T1AndFlare
                setResultArray={setResultArray}
                setIsResult={setIsResult}
                switchStateHandler={switchStateHandler}
              ></T1AndFlare>
            </div>
          ) : (
            <Result resultData={resultData} heading={choice.heading} />
          )}
        </div>
      )}
    </Fragment>
  )
}

export default App
