const mongoose=require("mongoose")
const express=require('express')
const Users=require("../Models/Regschema")
const activity=require("../Models/Activityschema")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const salt=10

router.post("/Register",async(req,res)=>{
const username= await Users.find({username:req.body.username})
if(username.length){
    res.status(400).send("username already exist")
}else{
    bcrypt.genSalt(salt,(salterr,saltval)=>{
        if (!salterr){
            bcrypt.hash(req.body.password,saltval,async(hasherr,hashval)=>{
                if(!hasherr){
                    await Users.create({username:req.body.username,password:hashval})
                    res.status(200).send("user created successfully")
                }else{
                    res.status(400).send("hash err")
                }
            })
        }else{
            res.status(400).send("salt err")
        }
    })
}
})

router.post("/Login",async(req,res)=>{
    const user= await Users.find({username:req.body.username})
    
    if(user.length){
       const val=await bcrypt.compare(req.body.password,user[0].password)
       if(val){
       const token= JWT.sign(user[0].username,process.env.SECRET_KEY)

        res.status(200).send({authtoken:token,username:user[0].username})
       }else{
        res.status(400).send("Invalid password")
       }
    }else{
        res.status(400).send("Invalid username")
    }
})
 
router.post("/createactivity",async(req,res)=>{
    try{
     const username= JWT.verify(req.headers.authorization,process.env.SECRET_KEY)
     if(username.length){
     await activity.create({
        username:username,
        activity:req.body.activity,
        status:req.body.status,
        sec:0,
    min:0,
    hrs:0,
    time:req.body.time,
        action:req.body.action
     })
    res.status(200).send("created")}

    }
    catch{
        res.status(400).send("err")
    }
})

router.get("/activity",async(req,res)=>{
    try{
const username=JWT.verify(req.headers.authorization,process.env.SECRET_KEY)
data=await activity.find({username:username})
if(data.length){
    res.status(200).send(data)
}
    }catch{
res.status(400).send("err")
    }
})

router.put("/pause",async(req,res)=>{
    try{
        const username=JWT.verify(req.headers.authorization,process.env.SECRET_KEY)
        await activity.updateOne({username:username,_id:req.body._id},{sec:req.body.sec,min:req.body.min,hrs:req.body.hrs,status:"paused",action:"resume"})
            res.status(200).send("done") 
            }catch{
        res.status(400).send("err")
            }
})
router.put("/end",async(req,res)=>{
    try{
        const username=JWT.verify(req.headers.authorization,process.env.SECRET_KEY)
        var sec=req.body.sec; var min=req.body.min; var hrs=req.body.hrs
        if(sec<10){ sec="0"+sec}
        if(min<10){min="0"+min}
        if(hrs<10){hrs="0"+hrs}
        const time=hrs+":"+min+":"+sec
        await activity.updateOne({username:username,_id:req.body._id},{sec:sec,min:min,hrs:hrs,time:time,status:"completed",action:""})
            res.status(200).send("done") 
            }catch{
        res.status(400).send("err")
            }
})

module.exports=router