const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const HttpError = require('./schema/http-error')
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



const organizationRouter = require('./routes/organization.routes');
app.use('/api/organizations',organizationRouter);

const authRouter = require('./routes/auth.routes');
app.use('/auth', authRouter);

const adminRouter = require('./routes/admin.routes')
app.use('/api/admins',adminRouter);

const studentRouter = require('./routes/student.routes')
app.use('/api/students',studentRouter);

app.use((req, res, next)=>{
  const error = new HttpError('Could not find this route', 404);
  throw error;
})

app.use((error,req, res, next)=>{
  if(res.headerSent){
    return next(error)
  }
  res.status(error.code || 500)
  res.json({message : error.message || 'An unknown error occured' });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))