import express from 'express';
import { signIn, signOut, signUp, sendOtp, verifyOtp, resetPassword } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// =========== SignUp Routes ====================
authRouter.post('/signup',signUp)

// ============ SignIn Routes ===================
authRouter.post('/signin',signIn)

// ============ SignOut Routes ===================
authRouter.get('/signout',signOut)



// ============ SendOTP Routes ===================
authRouter.post('/send-otp',sendOtp)



// ============ VerifyOTP Routes ===================
authRouter.post('/verify-otp',verifyOtp)



// ============ Reset Password Routes ===================
authRouter.post('/reset-password',resetPassword)


export default authRouter;