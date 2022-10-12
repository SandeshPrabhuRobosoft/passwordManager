if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express=require('express')
const mongoose=require('mongoose')
const app = express()
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db=mongoose.connection
db.on('error', error=>console.error(error))
db.once('open', ()=>console.log("connected to mongoose"))

const indexRouter=require('./routes/index')
app.use('/',indexRouter)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`App is running running on ${port}`)
})