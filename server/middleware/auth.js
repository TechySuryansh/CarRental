import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async(req, res, next) =>{
    try {
        // Check if authorization header exists
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.json({success:false,message:"not authorized - no token"})
        }

        const token = req.headers.authorization.split(" ")[1];
        console.log("Token:", token);
        
        if(!token){
            return res.json({success:false,message:"not authorized - token missing"})
        }

        // Verify token (not just decode)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded token:", decoded)
        
        if(!decoded){
            return res.json({success:false,message:"not authorized - invalid token"})
        }

        // Get user from token (decoded should contain user id)
        req.user = await User.findById(decoded._id || decoded.id || decoded).select('-password')
        console.log("User found:", req.user)
        
        if(!req.user){
            return res.json({success:false,message:"not authorized - user not found"})
        }

        next();
    }
    catch(error){
        console.log("Auth error:", error.message)
        return res.json({success:false,message:"not authorized - " + error.message})
    }
}