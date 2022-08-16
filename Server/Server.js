const express=require('express')
const { default: mongoose } = require('mongoose')
const app=express()
require("dotenv").config()
const router=require("./Routes/Router")
const cors=require("cors")

app.listen(3001,(err)=>{
    if(!err){
        console.log("connected to server")
    }else{
        console.log("server coonnection error")
    }
})
mongoose.connect("mongodb://localhost/Todo",()=>{
    console.log("connected to db")
},()=>{
    console.log("err connecting to db")
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use("/",router)
