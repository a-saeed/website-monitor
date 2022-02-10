import CustomError from "../models/CustomError.js"
import tokenModel from "../models/tokenModel.js";
import userModel from "../models/userModel.js";

/*checks if user is authenticated by comparing
/*the token attached to req.cookie
/*and token stored in db
*/
export const checkAuthentication = async (req, res, next) => {
    try {
        //parse cookie to return cookie with the name session
        const token = req.cookies.session  //returns token id
        if (!token) { res.statusCode = 401; throw "UNAUTHORIZED" }
        const storedToken = await tokenModel.findOne({ _id: token })
        //if no token exists in db, then user is unauthorized
        if (!storedToken) { res.statusCode = 401; throw "UNAUTHORIZED " }
        //else, return authorized user
        const user = await userModel.findOne({ _id: storedToken.userId })
        //attach user to request body
        req.user = user;  
        next();
    } catch (err) {
        next(new CustomError(res.statusCode, err))
    }
}
