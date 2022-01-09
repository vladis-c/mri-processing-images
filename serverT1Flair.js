const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

const titles = {}

app.get("/T1flair", (req, res) => {
  res.send(titles)
})

app.post("/T1flair", (req, res) => {
  const id = randomBytes(4).toString("hex")
  const { title } = req.body

  titles[id] = {
    id,
    title,
  }

  res.status(201).send(titles[id])
})

app.listen(4002, () => {
  console.log("Listening on 4002")
})
