import express from "express";
import User from "../models/userModel.js";
import mongoose  from "mongoose";
import bcrypt from "bcrypt";
const router = express.Router();


router.get('/',(req, res)=>{
    res.status(200).json({message:"sucess"})
})

// creating a new user

router.post('/',(req, res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        else{
            const user = new User({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                email:req.body.email,
                phone:req.body.phone,
                usertype:req.body.usertype
            });
        
            user.save()
            .then((data)=>{
                console.log(data);
                res.status(201).json({newUser:data})
            })
            .catch((err)=>{
                console.log(err);
                res.status(404).json({error:err})
            })
        }
    });

})

export default router;
