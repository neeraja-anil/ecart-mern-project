import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { topRatedProducts } from '../actions/productActions'
import Rating from './Rating'

const ProductCarousel = () => {

    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(topRatedProducts())
    }, [dispatch])
    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Carousel pause='hover' >
                {products.map(product => (
                    <Carousel.Item key={product._id} >
                        <Link to={`/products/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid className='fade-in-image' />
                            <Carousel.Caption className='carousel-caption'>
                                <h2 className='fade-in-h2 p-4'>{product.name}</h2>
                                <Rating value={product.rating} />
                                <p className='fade-in-h2'>{product.description}</p>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel