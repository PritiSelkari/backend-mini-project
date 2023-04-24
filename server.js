const express = require('express')
const mongoose =require('mongoose')
const bodyParser = require('body-parser')
//const jwt = require('jsonwebtoken')
const userRouter = require('./routes/user')

const app = express()
mongoose.connect("mongodb+srv://pritiselkari:0000@cluster0.yt5sz.mongodb.net/test").then(res=>{
  console.log("database connected")
}).catch(err=>{
  console.log("Facing an error while connecting")
}) 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/user',userRouter)
app.listen(8000,()=> {
    console.log("server is running on port 8000")
})