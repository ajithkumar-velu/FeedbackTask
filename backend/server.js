import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import feedbackRouter from './router/feedbackRouer.js'

const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/feedback', feedbackRouter)

app.get('/', (req, res)=>{
    res.send("API is Working...")
})



app.listen(port, ()=>{
    console.log(`server is running on post: ${port}`)
})