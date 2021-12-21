import jwt from "jsonwebtoken";

export default (req, res, next) =>{
    try {
        const token =req.headers.authorization.split(' ')[1];
        const verify= jwt.verify(token,"this is my first api");
        console.log(verify);
        if(verify.usertype==="user"){
            next();
        }
        else return res.status(401).json({message:'data not found'})
    } catch (error) {
        return res.status(500).json({message:'bad request'})
    }
}