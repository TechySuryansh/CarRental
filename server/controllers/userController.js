import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken=(userId)=>{
    const payload=userId
    return jwt.sign(payload,process.env.JWT_SECRET)
}
//register user
export const registerUser=async(req,res)=>{
    console.log('registerUser called with:', req.body);
    try{
        const {name,email,password,role}=req.body
        if(!name || !email || !password ){
            return res.json({success:false,message:"Please fill all the fields"})
        }
        if(password.length<6){
            return res.json({success:false,message:"Password must be at least 6 characters"})
        }
        console.log('Checking if user exists:', email)
        const userExists=await User.findOne({email})
        if (userExists){
            return res.json({success:false,message:"User already exists with this email"})
        }
        console.log('Creating new user...')
        const hashedPassword=await bcrypt.hash(password,10)
        const userRole = role === 'owner' ? 'owner' : 'user'
        const user=await User.create({name,email,password:hashedPassword,role:userRole})
        console.log('User created:', user._id, 'with role:', userRole)
        const token=generateToken({"_id":user._id.toString()})
        return res.status(201).json({success:true,token,message:"Account created successfully"})
    }
    catch(error){
        console.error('Registration error:', error)
        return res.json({success:false,message:error.message || "Registration failed"})
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