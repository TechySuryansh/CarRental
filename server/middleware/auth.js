import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async(req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token:", token);
    if(!token){
        return res.json({success:false,message:"not authorized"})
    }
    try{
        const userId=jwt.decode(token,process.env.JWT_SECRET)
        console.log(userId)
        if(!userId){
            return res.json({success:false,message:"not authorized"})
        }
        req.user=await User.findById({_id:userId}).select('-password')
        console.log(req.user)
        next();
        return 
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:"not authorized"})

    }
}