import  mongoose  from "mongoose";


const userSchema=new mongoose.Schema({ 
    _id:mongoose.Types.ObjectId,
    username:String,
    password:String,
    email:String,
    phone:Number,
    usertype:String
})

export default mongoose.model("User",userSchema)