require('dotenv').config()
require('express-async-errors')
const mongoose = require('mongoose')

const express = require('express')
const app = express()

const connectDB= require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
//middle ware
app.use(express.json())
//roots
app.get('/',(req,res)=>{
    res.send('<h1>Store API<h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products',productsRouter)

// product routes
app.use(errorMiddleware)
app.use(notFoundMiddleware)



const port = process.env.PORT || 3000

const start = async ()=>{
    try{
        console.log(process.env.MONGO_URI)
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listining on port ${port} `))
    }catch(error){
        console.log(error)
    }
}

start()