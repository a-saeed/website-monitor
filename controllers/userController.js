import userModel from '../models/userModel.js'
import tokenModel from '../models/tokenModel.js'
import CustomError from '../models/CustomError.js'
import bcrypt from 'bcrypt'

export const register = async (req, res, next) => {
    //log in
    try {
        //encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //save user provided from req.body
        const newUser = new userModel({
            email: req.body.email,
            password: hashedPassword
        });
        const user = await newUser.save()
        //generate a token for new logged in user + save it in db
        const token = new tokenModel({ userId: user._id })
        const newToken = await token.save();
        //set cookie with newly generated token with name session
        res.cookie('session', newToken._id);

        res.status(200).json(user)

    } catch (err) {
        next(new CustomError(res.statusCode,"error while creating user >> " +  err));
    }

}

export const login = async (req, res, next) => {
    try {
        //email exists? 
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) { res.status(401); throw "invalid credentials" }
       //password match?
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) { res.status(401); throw "invalid credentials" }
        //user is validated.. generate new token, save it to db and assign it to cookie
        const token = new tokenModel({ userId: user._id })
        const newToken = await token.save();
        res.cookie('session', newToken._id)

        //return user
        res.status(200).json(user)
    } catch (err) {
        next(new CustomError(res.statusCode,"error while logging >> " +  err));
    }
}

export const logout = async (req, res, next) => {
     try {
        //user is already attached to req passed by checkAuthentication
        //find and remove token from db
        await tokenModel.findOneAndRemove({ userId: req.user._id})
        res.clearCookie('session');
        res.status(200).json("logged out")

    } catch (err) {
        next(new CustomError(res.statusCode, "error while logging out  " + err))
    }
}