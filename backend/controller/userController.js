import userModel from "../models/userModels.js"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
import "dotenv/config";


    
const createToken = (id)=>{
            return jwt.sign({id},process.env.JWT_SECRET)
        }

const loginUser = async (req ,res)=>{

    const {email,password} = req.body;
     
    try {
        
        const user = await userModel.findOne({email})
        if (!user){
            return res.json({success:false,message:"user not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.json({success:false,message:"password not match"})
        }
        const token = createToken(user._id);
        
        return res.json({success:true,token,message:"successfully Loggedin"})
    }
    catch(error){
        return res.json({success:false,message:"error"})
    }
}
const registerUser = async(req,res)=>{
    const {email,name,password} = req.body;
    try {
       
        const exists = await userModel.findOne({email});
        if (exists){
            return res.json({success:false,message:"email already exists"})
        }
        if(!validator.isEmail(email)){
           return res.json({success:false,message:"please enter validate email"})
        }
        if (password.length<8){
           return res.json({success:false,message:"please enter Strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await hash(password,salt)

        const newUser = new userModel({
            name : name,
            email:email,
            password:hashedPassword
        })
       const user = await newUser.save()
       const token = createToken(user._id)
        res.status(200).json({ success: true,token});

    } catch (error) {
        res.json({success:false,message:"error"})
    }
}
export {registerUser ,loginUser} ;