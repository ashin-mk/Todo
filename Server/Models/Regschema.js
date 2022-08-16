const mongoose=require("mongoose")
const regschema=mongoose.Schema({
    username:String,
    password:String
})
const Register=mongoose.model("users",regschema)
module.exports=Register