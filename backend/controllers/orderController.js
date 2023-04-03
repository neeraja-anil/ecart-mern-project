import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc create new Order
//@route POST /api/orders
//@access private 
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        aymentMethod,
        itemsPrice,
        ShippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('NO ORDER ITEMS')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            aymentMethod,
            itemsPrice,
            ShippingPrice,
            taxPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }


})
export { addOrderItems } 
