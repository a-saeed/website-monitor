import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import colors from 'colors'
import 'dotenv/config'
import monitorRouter from './routes/monitorRoutes.js';
import userRouter from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js'

const port = process.env.PORT

const app = express();
app.use(express.json())
app.use(cookieParser())

/* ---------------------------- connect database ---------------------------- */
mongoose.connect(process.env.URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'.bgCyan))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))

/* --------------------------------- routes --------------------------------- */

//user routes
app.use('/user', userRouter)

//monitor router
app.use('/monitor', monitorRouter)

//error handler
app.use(errorHandler)

app.listen(port, () => {
    console.log('Example app listening on port >> ' + port);
});
