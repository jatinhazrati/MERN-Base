import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import template from '../template'

//Importing User Routes
import userRoutes from './routes/user.routes'

//Importing Authentication Routes
import authRoutes from './routes/auth.routes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //body parsr readded to provide request bodyParsing support out-of-box
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

//Root URL
// app.get('/', (req, res) => {
//   res.status(200).send(template())
// })

app.use('/', authRoutes)
app.use('/', userRoutes)

export default app;

