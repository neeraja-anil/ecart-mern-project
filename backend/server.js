import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import UserRoutes from './routes/userRoutes.js'
import OrderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json()) //body parser

app.get('/', (req, res) => {
    res.send('api running....')
})

app.use('/api/products', productRoutes);
app.use('/api/users', UserRoutes)
app.use('/api/orders', OrderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`app running in ${process.env.NODE_ENV} mode on port ${PORT}`))

