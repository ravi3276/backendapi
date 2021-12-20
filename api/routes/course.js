import express from "express";

const router = express.Router();

router.get('/',(req, res)=>{
    res.status(200).json({
        message: 'course route created'
    })
})


router.post('/',(req, res)=>{
    console.log(req.body.price);
})

export default router;
