import React, { useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart } from '../actions/cartActions'
import Message from '../components/Message'

const CartScreen = ({ location }) => {

    const { id } = useParams();
    const navigate = useNavigate()
    const { search } = useLocation();

    const productId = id
    const qty = search ? Number(new URLSearchParams(search).get('qty')) : 1
    console.log(qty);

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        console.log('remove')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>My Cart</h1>
                {cartItems.length === 0 ? <Message>Your Cart Is Empty,<Link to={'/'}> Go Back</Link></Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (

                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}><strong>{item.name}</strong></Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Select className='form-control'
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value))
                                            )
                                            }>
                                            {

                                                [...Array(item.countInStock).keys()].map(count => (
                                                    <option key={count + 1} value={count + 1}>{count + 1}</option>
                                                ))
                                            }

                                        </Form.Select>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={2}></Col>
            <Col md={2}></Col>

        </Row>
    )
}

export default CartScreen