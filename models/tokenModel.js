import mongoose from 'mongoose'
import userModel from './userModel.js';
 
const tokenSchema = mongoose.Schema({
    userId : { type : mongoose.SchemaTypes.ObjectId, ref: userModel} //refers to to the id field in userModel
})
const tokenModel = mongoose.model('tokenModel', tokenSchema)
export default tokenModel;