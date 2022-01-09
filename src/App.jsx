import React, { Fragment, useEffect, useState } from "react"
import T1Image from "./components/T1Image"
import FlairImage from "./components/FlairImage"
import Result from "./components/Result"
import T1AndFlare from "./components/T1AndFlair"
import { FLAIR, switchStateHandler, T1, T1FLAIR } from "./util/util"
import axios from "axios"

function App() {
  const [isResult, setIsResult] = useState(false)
  const [choice, setChoice] = useState({})

  const [titlesOfT1, setTitlesOfT1] = useState({})
  const [titlesOfFlair, setTitlesOfFlair] = useState({})
  const [titlesOfT1Flair, setTitlesOfT1Flair] = useState({})

  async function getT1Handler() {
    const res = await axios.get("http://localhost:4000/T1")
    setTitlesOfT1(res.data)
  }

  useEffect(() => {
    getT1Handler()
  }, [titlesOfT1])

  async function getFlairHandler() {
    const res = await axios.get("http://localhost:4001/flair")
    setTitlesOfFlair(res.data)
  }

  useEffect(() => {
    getFlairHandler()
  }, [titlesOfFlair])

  async function getT1FlairHandler() {
    const res = await axios.get("http://localhost:4002/T1flair")
    setTitlesOfT1Flair(res.data)
  }

  useEffect(() => {
    getT1FlairHandler()
  }, [titlesOfT1Flair])

  const conditions =
    choice.value === 1
      ? titlesOfT1
      : choice.value === 2
      ? titlesOfFlair
      : choice.value === 3
      ? titlesOfT1Flair
      : ""

  const renderedTitles = Object.values(conditions).map((title) => {
    return <p key={title.id}>{title.title}</p>
  })

  return (
    <Fragment>
      <div style={{ margin: "10px" }}>THIS IS MRI APP</div>
      <div style={{ margin: "10px" }}>
        <button
          onClick={() => {
            setChoice({ value: 1, heading: T1 })
            setIsResult(false)
          }}
        >
          {T1}
        </button>
        <button
          onClick={() => {
            setChoice({ value: 2, heading: FLAIR })
            setIsResult(false)
          }}
        >
          {FLAIR}
        </button>
        <button
          onClick={() => {
            setChoice({ value: 3, heading: T1FLAIR })
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
                setIsResult={setIsResult}
                switchStateHandler={switchStateHandler}
              ></T1Image>
            </div>
          ) : (
            <Result heading={choice.heading} renderedTitles={renderedTitles} />
          )}
        </div>
      )}
      {choice.value === 2 && (
        <div>
          {!isResult ? (
            <div>
              <h2 style={{ margin: "10px" }}>{choice.heading} INPUT IMAGE</h2>
              <FlairImage
                setIsResult={setIsResult}
                switchStateHandler={switchStateHandler}
              ></FlairImage>
            </div>
          ) : (
            <Result heading={choice.heading} renderedTitles={renderedTitles} />
          )}
        </div>
      )}
      {choice.value === 3 && (
        <div>
          {!isResult ? (
            <div>
              <h2 style={{ margin: "10px" }}>{choice.heading} INPUT IMAGES</h2>
              <T1AndFlare
                setIsResult={setIsResult}
                switchStateHandler={switchStateHandler}
              ></T1AndFlare>
            </div>
          ) : (
            <Result heading={choice.heading} renderedTitles={renderedTitles} />
          )}
        </div>
      )}
    </Fragment>
  )
}

export default App
