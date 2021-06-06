import app from './express'
import mongoose from 'mongoose'
import config from './../config/config'

//comment out before building for production
import devBundle from './devBundle'

//comment out before building for production
devBundle.compile(app)

// const CURRENT_WORKING_DIR = process.cwd()
// app.use('/dist', app.express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

//Listening on PORT
app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})


//configuring mongoose promise with global promise
mongoose.Promise = global.Promise

//Using connect method to connect to the server
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, () => {
  console.log("Successfully connected to db")
})

mongoose.connection.on('error', () => {
  throw new Error('unable to connect to database: ${mongoUri}')
})

