import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import UserRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('api running....')
})

app.use('/api/products', productRoutes);
app.use('/api/users', UserRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`app running in ${process.env.NODE_ENV} mode on port ${PORT}`))

