import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'


//comment out before building for production
import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//comment out before building for production
devBundle.compile(app)

// parse body params and attach them to req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //body parsr readded to provide request bodyParsing support out-of-box
app.use(cookieParser())
app.use(compress())
//secure apps by setting various HTTP Headers
app.use(helmet())
//enable CORS - Cross Origin Resource Sharing
app.use(cors())

//Mounting Routes
app.get('/', (req, res) => {
  res.status(200).send(template())
})
app.use('/', authRoutes)
app.use('/', userRoutes)

//Auth Error Handling for express-jwt (Catch Unauthorized Errors)
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({"error" : err.name + ":" + err.message})
  }else if(err){
    res.status(400).json({"error" : err.name + ":" + err.message})
    console.log(err)
  }
})

export default app

