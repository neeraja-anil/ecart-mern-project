import express from 'express'
import { addCartItems, getCartItems } from '../controllers/cartControllers.js'
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/').post(protect, addCartItems).get(protect, getCartItems)

export default router