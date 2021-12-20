import  mongoose  from "mongoose";

const studentSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:String,
    email:String,
    phonenum:Number,
    gender:String
})

export default mongoose.model('Student',studentSchema);