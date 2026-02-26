import User from "../models/user.model.js";
import bcrypt  from "bcryptjs";
import genToken from "../config/utils/token.js";


// ==========  SignIn controller ===========

export const signIn = async (req,res) => {
    try {
          const { email , password } = req.body;
          let user = await User.findOne({email});

          if(!user){
                return res.status(400).json({message: "User does not exists"});          
            }

          const isMatch = await  bcrypt.compare(password,user.password);
          if(!isMatch){
             return res.status(400).json({message: "Incorrect Password"});
          }
          
            const token  = await genToken(user._id);
            res.cookie("token", token,{
                secure: false,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            res.status(200).json({message: "User created Successfully", token})
    } catch (error) {
        res.status(500).json({message: "Sign in  error"})
    }

}


// =========== SignUp controller =============

export const signUp = async (req,res) => {
    try {
          const {fullName , email , password , mobile, role} = req.body;
          const user = await User.findOne({email});
          if(user){
                return res.status(400).json({message: "User already exists"});          
            }

          if(password.length < 8){
                return res.status(400).json({message: "Password must be at least 8 characters long"});      
          }
          if(mobile.length < 10){
            return res.status(400).json({message: "Mobile number must be at least 10 digits long"});  
          }
          const hashPassword =  await bcrypt.hash(password, 10);
          user = await User.create({
                fullName,
                email,
                role,
                mobile,
                password:hashPassword
            })


            const token  = await genToken(user._id);
            res.cookie("token", token,{
                secure: false,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            res.status(201).json({message: "User created Successfully", token})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }

}


// =========== Signout Controller ====================

export const signOut = async (req,res)=> {
    try {
           res.clearCookie("token");
           return res.status(200).json({message: "Logout Successfully"})
    } catch (error) {
           return res.status(200).json({message: "Sign Out error"})
    }

}


// =========== OTP verification Controller ====================

export const verifyOtp = async (req,res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }
        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        await user.save();
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP" });
    }
}