import User from "../models/user.model.js";
import bcrypt  from "bcryptjs";
import genToken from "../config/utils/token.js";
import { sendOtpEmail } from "../config/utils/mail.js";

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
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    // ✅ Required Fields Check
    if (!fullName || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ Check Existing User
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ✅ Password Validation
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // ✅ Mobile Validation
    if (mobile.length < 10) {
      return res.status(400).json({
        message: "Mobile number must be 10 digits",
      });
    }

    // ✅ Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // ✅ Create User
    const user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashPassword,
    });

    // ✅ Generate Token
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ✅ SUCCESS MESSAGE (Popup Uses This)
    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =========== Signout Controller ====================

export const signOut = async (req,res)=> {
    try {
           res.clearCookie("token");
           return res.status(200).json({message: "Logout Successfully"})
    } catch (error) {
           return res.status(200).json({message: "Sign Out error"})
    }

}

// ============ Send OTP Controller ====================
export const sendOtp = async (req,res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please enter the email" });
        }
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = generatedOtp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
        await user.save();
        await sendOtpEmail(user.email, generatedOtp);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending OTP" });
    }
}


// =========== OTP verification Controller ====================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    // User check
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // OTP validation
    if (
      user.resetOtp !== otp.toString() ||
      user.otpExpires < new Date()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // OTP verified
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error verifying OTP",
    });
  }
};


// =========== Reset Password COntroller ====================

export const resetPassword = async (req,res) =>{
    try {
        const { email , newPassword} = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "User does not exist or OTP not verified" });
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.isOtpVerified = false; // Reset OTP verification status
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password" });
    }
}




// ==================== Google Authentication controller ========

