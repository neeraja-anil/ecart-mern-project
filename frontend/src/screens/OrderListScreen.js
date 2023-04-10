import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ListOrders } from '../actions/orderActions'
import { ORDER_LIST_RESET } from '../constants/orderConstants'

const OrderListScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        dispatch({ type: ORDER_LIST_RESET })

        if (userInfo && userInfo.isAdmin) {
            dispatch(ListOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])

    return (
        <>

            <Row className='align-items-center'>
                <Col><h1>Orders</h1></Col>
            </Row>
            {loading ? <Loader /> :
                error ? <Message variant='danger'>{error}</Message> : (
                    <Table striped responsive bordered hover className='table-sm'>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order For</th>
                                <th>Price</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times'></i>
                                    )}</td>
                                    <td>{order.isDelivered ?
                                        (
                                            <span>
                                                {order.deliveredAt.substring(0, 10)} <i className='fas fa-check' style={{ color: 'green' }}></i>
                                            </span>

                                        ) :
                                        (<i className='fas fa-times' style={{ color: 'red' }}></i>)}</td>

                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>Details</Button>
                                        </LinkContainer>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )

            }
        </>
    )
}

export default OrderListScreen