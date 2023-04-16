import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

//@desc insert cart items to db
//@route POST /api/cart
//@access private 

const addCartItems = asyncHandler(async (req, res) => {
    const { cartItems } = req.body

    const cart = await Cart.findOne({ user: req.user._id })
    if (cart) {
        const item = cart.cartItems.find(x => x.product.equals(cartItems.product))
        let condition, update

        if (item) {
            condition = { user: req.user._id, "cartItems.product": cartItems.product }
            update = {
                "$set": {
                    "cartItems.$": {
                        ...req.body.cartItems,
                        qty: item.qty + req.body.cartItems.qty
                    }
                }
            }
        } else {
            //res.status(200).json({ message: cartItems })
            condition = { user: req.user._id }
            update = {
                "$push": {
                    "cartItems": req.body.cartItems
                }
            }
        }
        const ifCart = await Cart.findOneAndUpdate(condition, update)
        if (ifCart) {
            return res.status(201).json({ cart: cart })
        }

    } else {
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