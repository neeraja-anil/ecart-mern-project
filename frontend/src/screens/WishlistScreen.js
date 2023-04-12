import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { addToWishlist, removeFromWishlist } from '../actions/wishlistActions'
import Message from '../components/Message'

const WishlistScreen = () => {

    const { id } = useParams();
    const productId = id


    const dispatch = useDispatch()
    const wishlist = useSelector(state => state.wishlist)
    const { wishlistItems } = wishlist

    useEffect(() => {
        if (productId) {
            dispatch(addToWishlist(productId))
        }

    }, [dispatch, productId])


    const removeFromWishlistHandler = (productId) => {
        dispatch(removeFromWishlist(productId))
    }
    return (
        <Row>
            <Col md={8}>
                <h1>My Wishlist</h1>
                {wishlistItems.length === 0 ? <Message>No Items In List<Link to={'/'}> Go Back</Link></Message> : (
                    <ListGroup variant='flush'>
                        {wishlistItems.map(item => (

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
                                        <i className={item.toggleheart && 'fas fa-heart'} onClick={() => removeFromWishlistHandler(item.product)}></i>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

        </Row>
    )
}

export default WishlistScreen