import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc create new Order
//@route POST /api/orders
//@access private 
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
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
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }


})

//@desc Get Order by id
//@route GET /api/orders/:id
//@access private 
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }

})


//@desc update order to paid
//@route GET /api/orders/:id/pay
//@access private 
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }

})


//@desc Get loggedIn user Orders
//@route GET /api/orders/myorders
//@access private 
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)

})
export { addOrderItems, getOrderById, updateOrderToPaid, getUserOrders } 
