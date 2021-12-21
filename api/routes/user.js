import express from "express";
import User from "../models/userModel.js";
import mongoose  from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
                usertype:req.body.usertype,
                createdAt:new Date()
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

router.post('/login',(req, res)=>{
    User.find({username:req.body.username})
    .exec() // exactly match
    .then((user)=>{
        if(user.length < 1){
            return res.status(401).json({message:'user not found'})
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{ 
            if(!result) {return res.status(401).json({message:'password not match'}) }
            if(result){
               const token= jwt.sign({
                    username:user[0].username,
                    usertype:user[0].usertype,
                    email:user[0].email,
                    phone:user[0].phone
                },
                "this is my first api",
                {expiresIn:"24h"}
                )

                res.status(200).json(
                    {
                        username:user[0].username,
                        usertype:user[0].usertype,
                        email:user[0].email,
                        phone:user[0].phone,
                        token:token
                    }
                )
            }
        })
    })
    .catch(err => res.status(404).json({message:err}))
})

export default router;
