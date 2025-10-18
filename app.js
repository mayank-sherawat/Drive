const express = require('express')
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv')
const connectToDB = require('./config/db')
const cookieParser = require('cookie-parser');
const IndexRouter = require('./routes/index.routes');
const auth = require('./Middlewares/auth');
const app = express()
const port = 3001
dotenv.config()
connectToDB()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/user' , userRouter)
app.use('/', IndexRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
