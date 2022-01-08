import React, { Fragment, useState, useEffect } from "react"
import T1Image from "./components/T1Image"
import FlairImage from "./components/FlairImage"
import Result from "./components/Result"
import T1AndFlare from "./components/T1AndFlare"
import { switchStateHandler } from "./util/util"

function App() {
  const [isSending, setIsSending] = useState("")
  const [showIsSending, setShowIsSending] = useState(false)

  const [resultArray, setResultArray] = useState([])

  const [isResult, setIsResult] = useState(false)
  const [choice, setChoice] = useState({})

  useEffect(() => {
    setShowIsSending(true)
    let timer = setTimeout(() => {
      setShowIsSending(false)
      setIsSending("Sent")
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [isSending])

  const T1 = "T1"
  const FLAIR = "FLAIR"
  const T1FLAIR = "T1 + FLAIR"

  const resultData = resultArray.map((el, key) => <p key={key}>{el}</p>)

  // CHECK FOR VALID COMBINATIONS. Get Results Button Can be shown whenever it is right combination.

  return (
    <Fragment>
      <div>THIS IS MRI APP</div>
      <div>
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
              <h1>{T1} INPUT IMAGE</h1>
              <T1Image
                setIsSending={setIsSending}
                setResultArray={setResultArray}
                showIsSending={showIsSending}
                isSending={isSending}
                setIsResult={setIsResult}
                switchStateHandler={switchStateHandler}
                setIsStructuralSegmentInParent={undefined}
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
              <h1>{FLAIR} INPUT IMAGE</h1>
              <FlairImage
                setIsSending={setIsSending}
                setResultArray={setResultArray}
                showIsSending={showIsSending}
                isSending={isSending}
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
              <h1>{T1FLAIR} INPUT IMAGES</h1>
              <T1AndFlare
                setIsSending={setIsSending}
                setResultArray={setResultArray}
                showIsSending={showIsSending}
                isSending={isSending}
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
