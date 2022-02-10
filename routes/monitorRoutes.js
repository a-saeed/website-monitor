import express from 'express'
import { ping } from '../controllers/ping.js';
import { checkAuthentication } from '../middleware/checkAuthentication.js';
const monitorRouter = express.Router();

monitorRouter.get('/ping', checkAuthentication, ping)


export default monitorRouter