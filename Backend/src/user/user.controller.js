import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail.js";
import { otpTemplate } from "../utils/otp.template.js";
import { generateOTP } from "../utils/generate.otp.js";
export const createUser = async (req,res)=>{
    try{
        const data = req.body;
        const user = new UserModel(data)
        await user.save();
        res.json(user);
    }catch(err){
        res.status(500).json({message : err.message});
    }
}

export const sendEmail = async (req,res)=>{
    try{
        const {email} = req.body;
        const OTP = generateOTP()
        await sendMail(email,"OTP For Signup",otpTemplate(OTP));
        res.json({
            message : "Email sent successfully",
            otp : OTP,
            success : true
        });
    }catch(err){
        res.status(500).json({message : err.message});
    }
}


const createToken = async (user)=>{
    const payload = {
        id : user._id,
        fullname: user.fullname,
        email : user.email,
        role : user.role
    }

    const token = await jwt.sign(payload,process.env.AUTH_SECRET,{expiresIn:"1d"})
    return token;
}
export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModel .findOne({email})
        if(!user)
            return res.status(404).json({message:"User  not found !"})
        const isLoged = await bcrypt.compare(password,user.password);
        if(!isLoged)
            return res.status(401).json({message:"Incorrect password !"})

        const token =await createToken(user);
        res.cookie("authToken",token,{
            maxAge : 86400000,
            domain : process.env.ENVIRONMENT === "DEV" ? "localhost" : process.env.DOMAIN,
            secure : process.env.ENVIRONMENT === "DEV" ? false : true,
            httpOnly : true 
        });
        res.json({message: "Login Success"})
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
}