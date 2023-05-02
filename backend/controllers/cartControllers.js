import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

//@desc insert cart items to db
//@route POST /api/cart
//@access private 

const addCartItems = asyncHandler(async (req, res) => {
    const { cartItems } = req.body

    const cart = await Cart.findOne({ user: req.user._id })
    if (cart) {
        const item = cart.cartItems.filter(o1 => cartItems.some(o2 => o1.product.equals(o2.product)))
        const itemExists = cartItems.every(cartItem => cart.cartItems.some(c => c.product.equals(cartItem.product)));
        let condition, update

        if (itemExists) {
            const product = cartItems.filter(x1 => item.some(x2 => x2.product.equals(x1.product)))
            product.forEach(pro => {
                condition = { user: req.user._id, "cartItems.product": pro.product }
                update = {
                    "$set": {
                        "cartItems.$": {
                            name: pro.name,
                            price: pro.price,
                            image: pro.image,
                            product: pro.product,
                            qty: pro.qty
                        }
                    }
                }
            })


        } else {
            const newItems = cartItems.filter(cartItem => !cart.cartItems.some(c => c.product.equals(cartItem.product)))
            if (newItems.length > 0) {
                condition = { user: req.user._id }
                update = {
                    "$addToSet": {
                        "cartItems": { "$each": newItems }
                    }
                }
            }

        }
        const ifCart = await Cart.findOneAndUpdate(condition, update, { new: true })
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

//@desc DELETE cart items from db
//@route DELETE /api/cart
//@access private 

const removeCartItems = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })

    if (cart) {
        Cart.updateOne(
            { user: req.user._id },
            { $pull: { cartItems: { product: req.params.id } } }
        ).then(() => res.json({ message: 'Product removed' }))


    } else {
        res.status(404)
        throw new Error('Item Not Found')
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

export { addCartItems, getCartItems, removeCartItems }