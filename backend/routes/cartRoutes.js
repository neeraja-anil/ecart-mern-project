import express from 'express'
import { addCartItems, getCartItems, removeCartItems } from '../controllers/cartControllers.js'
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/').post(protect, addCartItems).get(protect, getCartItems)
router.route('/:id').delete(protect, removeCartItems)

export default router