import app from './express'
import mongoose from 'mongoose'
import config from './../config/config'

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

//Listening on PORT
app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})
