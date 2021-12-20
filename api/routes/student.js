import express from "express";
import Student from '../models/studentModel.js';
import  mongoose  from "mongoose";

const router = express.Router();

// getting all data from Db's
router.get('/',(req, res)=>{
    Student.find({})
    .then((data)=>{
        console.log(data); 
        res.status(200).json({newStudent:data})
    })
    .catch((err)=>{console.log(err);})
})

// creating student details
router.post('/',(req, res)=>{
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phonenum:req.body.phonenum,
        gender:req.body.gender
    });

    student.save()
    .then((data)=>{
        console.log(data);
         res.status(201).json({newStudent:data})
        })
    .catch((err)=>{console.log(err); res.status(400)})
})


// get data by id
router.get('/:id', (req, res) => {
    Student.findById(req.params.id)
    .then((data)=>{
        console.log(data);
         res.status(201).json({newStudent:data})
        })
    .catch((err)=>{console.log(err); res.status(400)})
})


// remove data by id
router.delete('/:id', (req, res) => {
    Student.deleteOne({_id:req.params.id})
    .then((data)=>{
         res.status(201).json({newStudent:"data removed successfully"})
        })
    .catch((err)=>{console.log(err); res.status(400)})
})


// update email data by id
router.delete('/:id', (req, res) => {
    Student.findOneAndUpdate({_id: req.params.id},{$set:{
        name:req.body.name,
        email:req.body.email,
        phonenum:req.body.phonenum,
        gender:req.body.gender
    }})
    .then((data)=>{
         res.status(201).json({newStudent:"data updated successfully"})
        })
    .catch((err)=>{console.log(err); res.status(400)})
})

export default router;
