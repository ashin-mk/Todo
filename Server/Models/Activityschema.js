const mongoose=require("mongoose")
const activityschema=mongoose.Schema({
    username:String,
    activity:String,
    status:String,
    sec:Number,
    min:Number,
    hrs:Number,
    time:String,
    action:String
})
const activity=mongoose.model("activities",activityschema)
module.exports=activity