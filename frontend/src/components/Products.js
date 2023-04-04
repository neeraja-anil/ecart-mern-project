import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from './Rating'

const Products = ({ product }) => {
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
                <Card.Text as='h4'>${product.price}</Card.Text>
                {/* <Button variant="primary">Add To Cart</Button> */}
            </Card.Body>
        </Card>
    )
}

export default Products