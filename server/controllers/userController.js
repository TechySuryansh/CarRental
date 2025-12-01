import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken=(userId)=>{
    const payload=userId
    return jwt.sign(payload,process.env.JWT_SECRET)
}
//register user
export const registerUser=async(req,res)=>{
    console.log('registerUser called');
    try{
        const {name,email,password}=req.body
        if(!name || !email || !password ){
            return res.json({success:false,message:"fill all the feilds"})
        }
        if(password.length<6){
            return res.json({success:false,message:"password must be at least 6 characters"})
        }
        console.log(email)
        const userExists=await User.findOne({email})
        console.log(userExists)
        if (userExists){
            return res.json({success:false,message:"User already Exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({name,email,password:hashedPassword})
        const token=generateToken({"_id":user._id.toString()})
        return res.status(201).json({success:true,token})
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}

//login user 
export const loginUser=async(req,res)=>{
try{
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        return res.json({success:false,message:"user not found"})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.json({success:false,message:"Invalid Credentials"})
    }
    const token=generateToken({"_id" : user._id.toString()})
    res.json({success:true,token})
    // console.log(token)
    return {success:true,token}
    
}
catch(error){
    console.log(error.message)
    return res.json({success:false,message:error.message})

}}


//get user data using token (jwt)

export const getUserData=async(req,res)=>{
    try{
        const {user}=req;
        res.json({success:true,user})

    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}