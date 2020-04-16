const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/internbuddy", {
  useNewUrlParser: "true",
  useUnifiedTopology: true
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})


const authRouter = require('./routes/auth.routes');
app.use('/auth', authRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))