import express from 'express'
import { login, logout, register } from '../controllers/userController.js';
import { checkAuthentication } from '../middleware/checkAuthentication.js';
const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', checkAuthentication,logout)

export default userRouter