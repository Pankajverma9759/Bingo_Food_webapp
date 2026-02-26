import express from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// =========== SignUp Routes ====================
authRouter.post('/signup',signUp)

// ============ SignIn Routes ===================
authRouter.post('/signin',signIn)

// ============ SignOut Routes ===================
authRouter.get('/signout',signOut)



export default authRouter;