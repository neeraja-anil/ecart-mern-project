import React, { useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'



const OrderScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderId = useParams()

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error } = orderDetails

    if (!loading) {
        //calculate Prices

        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) =>
            acc + item.price * item.qty, 0
        )
        )
    }


    useEffect(() => {
        if (!order || order._id !== orderId.id) {
            dispatch(getOrderDetails(orderId.id))
        }

    }, [dispatch, order, orderId])

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>Shipping</h4>
                                <p><strong>Name: </strong> {order.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                                <p>
                                    <strong>Address:</strong>{' '}
                                    {order.shippingAddress.address},{' '}
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <Message variant='success'>Delivered On {order.deliveredAt}</Message>
                                ) :
                                    <Message variant='danger'>Not Delivered</Message>
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h4>Payment Method</h4>
                                <p>
                                    <strong>Payment:</strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ?
                                    <Message variant='success'>Paid On {order.PaidAt}</Message> :
                                    <Message variant='danger'>Not Paid</Message>
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h4>Order Items</h4>
                                {order.orderItems.length === 0 ?
                                    <Message><Link to={'/'}>No Orders? Purchase With Us</Link></Message> : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item) => (
                                                <ListGroup.Item key={item.product}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} =${item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h4>Order Summery</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
    )
}

export default OrderScreen