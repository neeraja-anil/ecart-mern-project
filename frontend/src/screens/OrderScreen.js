import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET, ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../constants/orderConstants'



const OrderScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderId = useParams()

    const [sdkReady, setSdkReady] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

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

        if (!userInfo) {
            navigate('/login')
        }

        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || order._id !== orderId.id || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVERED_RESET })
            dispatch(getOrderDetails(orderId.id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, order, orderId, successPay, successDeliver, userInfo, navigate])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId.id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const successOrderHandler = () => {
        dispatch({ type: ORDER_CREATE_RESET })
        navigate('/')
    }


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
                                    <Message variant='success'>Delivered On {order.deliveredAt.substring(0, 10)}</Message>
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
                                    <Message variant='success'>Paid On {order.paidAt.substring(0, 10)}</Message> :
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
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> : (
                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                        )}
                                    </ListGroup.Item>
                                )}
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn w-100' onClick={deliverHandler}>Mark As Delivered</Button>
                                    </ListGroup.Item>
                                )}
                                {order.isPaid && (
                                    <ListGroup.Item>
                                        <LinkContainer to={'/'}>
                                            <Button className='w-100' onClick={successOrderHandler}>Go Back</Button>
                                        </LinkContainer>
                                    </ListGroup.Item>
                                )}

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
    )
}

export default OrderScreen