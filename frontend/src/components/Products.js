import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { addToWishlist, removeFromWishlist } from '../actions/wishlistActions'

import Rating from './Rating'

const Products = ({ product }) => {

    const wishlist = useSelector(state => state.wishlist)
    const { wishlistItems } = wishlist
    const existItem = wishlistItems.find(wishlistItem => wishlistItem.product === product._id)
    console.log(existItem && existItem.product)


    const [toggleHeart, setToggleHeart] = useState(false);
    const dispatch = useDispatch()

    const heartChangeHandler = () => {
        setToggleHeart(!toggleHeart)
        if (!toggleHeart) {
            dispatch(addToWishlist(product._id))
        } else if (existItem && existItem.product === product._id) {
            dispatch(removeFromWishlist(product._id))
        } else {
            dispatch(removeFromWishlist(product._id))
        }
    }



    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/products/${product._id}`}>
                <Card.Img variant='top' src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`/products/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                </Card.Text>
                <Row>
                    <Col><Card.Text as='h4'>${product.price}</Card.Text></Col>

                    <Col>{existItem && existItem.product ? <i className='fas fa-heart' onClick={heartChangeHandler}></i> : <i className={!toggleHeart ? 'far fa-heart' : 'fas fa-heart'} onClick={heartChangeHandler}></i>}</Col>
                </Row>


            </Card.Body>
        </Card>
    )
}

export default Products