import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

//@desc insert cart items to db
//@route POST /api/cart
//@access private 

const addCartItems = asyncHandler(async (req, res) => {
    const { cartItems } = req.body

    if (cartItems && cartItems.length === 0) {
        res.status(400)
        throw new Error('NO ITEMS IN CART')
    } else {
        const cart = new Cart({
            cartItems,
            user: req.user._id,
        })
        const createdCart = await cart.save()
        res.status(201).json(createdCart)
    }
})

//@desc GET cart items from db
//@route GET /api/cart
//@access private 

const getCartItems = asyncHandler(async (req, res) => {
    const cart = await Cart.find({ user: req.user._id })

    if (cart) {
        res.json(cart)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

export { addCartItems, getCartItems }